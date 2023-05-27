import { Model, Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import {IUser, IUserMethods, IUserWithoutPassword,
} from "@src/interfaces/IUser";

type UserModel = Model<IUser, object, IUserMethods>;

const UserSchema = new Schema<IUser, Model<IUser, object>>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (username: string) => {
        const user = await User.findOne({ username });
        if (user) {
          return false;
        }
      },
      message: "This user is already registered",
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set("toJSON", {
  transform: (_, ret: IUserWithoutPassword) => {
    delete ret.password;
    return ret;
  }
});

UserSchema.method("checkPassword", function (this: IUser, password: string) {
  return bcrypt.compare(password, this.password);
});

UserSchema.methods.generateToken = function (this: IUser) {
  this.token = nanoid();
};

const User = model<IUser, UserModel>("user", UserSchema);

export type UserDocument = Document & Omit<IUser & Required<{ _id: Schema.Types.ObjectId }>, keyof IUserMethods> & IUserMethods;
export default User;