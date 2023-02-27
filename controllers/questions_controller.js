const Question = require('../models/question');
const Comment = require('../models/comment');

module.exports.post = async function(req, res){
    try{
        await Question.create({content: req.body.question, user: req.user._id})
        // console.log(req.user._id);
        return res.redirect('back')
    } catch(err){
        console.log('Error in creating a question!: ', err);
    }
}

module.exports.destroy = async function(req, res){
    try{
        const que = await Question.findById(req.params.id);
        if(que && req.user.id == que.user){
            que.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in deleting the question: ', err);
        return;
    }
}

