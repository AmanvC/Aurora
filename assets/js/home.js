function showAnswerForm(qid, object){
    let answerForm = document.getElementsByClassName(`comment-form ${qid}`)[0];
    answerForm.style.display = 'flex';
}

function showComments(qid){
    let commentContainer = document.getElementsByClassName(`comments ${qid}`)[0];
    if(commentContainer.style.display == 'block'){
        commentContainer.style.display = 'none';
    }else{
        commentContainer.style.display = 'block';
    }
}

let commentInput = document.querySelector('.comment-form form textarea');

function closeForm(qid){
    let answerForm = document.getElementsByClassName(`comment-form ${qid}`)[0];
    answerForm.style.display = 'none';
    commentInput.value = '';
}
