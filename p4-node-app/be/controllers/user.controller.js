import { User, validateUser } from "../models/user.model.js";
import { createToken } from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
    const { first_name, last_name, email_address, password } = req.body;
    
    const isUserExist = await User.findOne({ email_address });
    if (isUserExist) {
      return res.status(409).send("Email already exist.");
    }

    const hash = await bcrypt.hash(password, 10);

    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = new User({
      first_name,
      last_name,
      email_address,
      password: hash
    })
    await user.save();

    return res.status(201).send({
      message: "User is created successfully",
      data: user
    })
}

const signIn = async (req, res) => {
    const { email_address, password } = req.body;
    
    const user = await User.findOne({ email_address });
    if (!user) {
      res.status(404);
      throw new Error("User does not exist.");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(400);
        throw new Error("Passwords is not match.");
      } else {
        res.status(200).send({
          message: "Login successfully.",
          data: createToken(user)
        })
      }
    }
}

export { signUp, signIn };
