class PostComments {
  constructor(e) {
    (this.postId = e),
      (this.postContainer = $("#post-" + e)),
      (this.newCommentForm = $(`#post-${e}-comments-form`)),
      this.createComment(e);
    let t = this;
    $(" .delete-comment-button", this.postContainer).each(function () {
      t.deleteComment($(this));
    });
  }
  createComment(e) {
    let t = this;
    this.newCommentForm.submit(function (n) {
      n.preventDefault();
      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(this).serialize(),
        success: function (n) {
          let o = t.newCommentDom(n.data.comment);
          $("#post-comments-" + e).prepend(o),
            t.deleteComment($(" .delete-comment-button", o)),
            new ToggleLike($(" .toggle-like-button", o)),
            new Noty({
              theme: "relax",
              text: "Comment published!",
              type: "success",
              layout: "topRight",
              timeout: 1500,
            }).show();
        },
        error: function (e) {
          console.log(e.responseText);
        },
      });
    });
  }
  newCommentDom(e) {
    return $(
      `<li id="comment-${e._id}">\n                        <p>\n                            \n                            <small>\n                                <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>\n                            </small>\n                            \n                            ${e.content}\n                            <br>\n                            <small>\n                                ${e.user.name}\n                            </small>\n                            <small>\n                            \n                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Comment">\n                                    0 Likes\n                                </a>\n                            \n                            </small>\n\n                        </p>    \n\n                </li>`
    );
  }
  deleteComment(e) {
    $(e).click(function (t) {
      t.preventDefault(),
        $.ajax({
          type: "get",
          url: $(e).prop("href"),
          success: function (e) {
            $("#comment-" + e.data.comment_id).remove(),
              new Noty({
                theme: "relax",
                text: "Comment Deleted",
                type: "success",
                layout: "topRight",
                timeout: 1500,
              }).show();
          },
          error: function (e) {
            console.log(e.responseText);
          },
        });
    });
  }
}
