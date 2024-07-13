import { User, validateUser } from "../models/user.model.js";
import { createToken } from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { first_name, last_name, email_address, password } = req.body;
  
  try {
    const isUserExist = await User.findOne({ email_address });
    if (isUserExist) {
      return res.status(409).send("Email already exists.");
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
    });
    await user.save();

    const token = createToken(user); 
    return res.status(201).json({
      message: "User created successfully",
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

const signIn = async (req, res) => {
  const { email_address, password } = req.body;
  
  try {
    const user = await User.findOne({ email_address });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Incorrect password.");
    }

    const token = createToken(user); 
    res.status(200).json({
      message: "Login successful.",
      data: {
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

export { signUp, signIn };
