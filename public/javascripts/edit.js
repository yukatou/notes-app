var _updateTitle = function () {
  var noteId = $('#noteid').val();
  var title = $('#title').val();
  var $li = $('#notes').find(`li[data-noteid="${noteId}"]`)
  var $a = $li.find('a[data-action="select"]');
  $a.text(title);
};

var _saveNote = function () {
  var bookId = $('#bookid').val();
  var noteId = $('#noteid').val();
  var title = $('#title').val();
  var delta = quill.getContents();
  var note = {
    bookId, noteId, title,
    content: JSON.stringify(delta)
  };
  $.ajax({
    url: `/api/notes/${noteId}`,
    method: 'PUT',
    data: note,
    error: (xhr, status, error) => {
      console.error(error);
    }
  });
};

var title_onfocusout = function (event) {
  _updateTitle();
  _saveNote();
};

var contenttext_onchange = function (range, oldRange, source) {
  if (!range) return;
  _saveNote();
};

var window_onbeforeunload = function (event) {
  _saveNote();
};

var document_onload = function (event) {
  $('#title').on('focusout', title_onfocusout);
  quill.on('text-change', contenttext_onchange);
};

$(document).ready(document_onload);
$(window).on('beforeunload', window_onbeforeunload);