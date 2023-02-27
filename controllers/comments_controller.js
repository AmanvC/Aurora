const Comment = require('../models/comment');
const Question = require('../models/question');
const { post } = require('../routes/comments');

module.exports.create = async function(req, res){
    try{
        const question = await Question.findById(req.body.questionId);
        if(question){
            const comment = await Comment.create({
                content: req.body.comment,
                user: req.user._id,
                question: req.body.questionId
            });

            if(comment){
                question.comments.push(comment);
                question.save();
                return res.redirect('back');
            }
        }
    }catch(err){
        console.log(`Error in creating comment for the question: ${err}`);
        return;
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        let questionId = comment.question;
        let question = await Question.findById(questionId);
        if(comment.user == req.user.id || req.user.id == question.user ){
            comment.remove();
            Question.findByIdAndUpdate(questionId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
        
    }catch(err){
        console.log('Error in deleteing comment: ', err);
        return;
    }
}