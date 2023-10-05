import Jwt from "jsonwebtoken";
const generateToken = (id: Object) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "3d" });
};

export default generateToken;
