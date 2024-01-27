import userModel from "../../Model/UserModel/User.js";
import Auth from "../../Auth/Auth.js";

const Login = async (req, res) => {
    let resData = await userModel.findOne({ email: req.body.email });
    if (resData) {
        const paswordCheck = await Auth.hashCompare(req.body.password, resData.password)
        // console.log(paswordCheck);
        if (paswordCheck) {
            let token = await Auth.creatToken({
                id: resData._id,
                email: resData.email,
                username: resData.username,
                profil:resData.profileImgUrl
            })
            res.status(200).send({ message: 'Login Successfully', token })
        } else {
            res.status(400).send({ message: 'please check your password' })
        }
    } else {
        res.status(400).send({ message: 'email is not exist' })
    }
}


export default { Login }