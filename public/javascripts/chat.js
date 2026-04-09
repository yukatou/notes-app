var createHumanMessage = (message) => {
  return $('<div></div>', {
    addClass: 'human-message py-2 d-flex flex-column',
  }).html(`
    <div class='fs-5'><i class='fas fa-user'></i> user</div>
    <div class='pb-2'><pre style='white-space: pre-wrap'>${message}</pre></div>
  `);
};

var createAIMessage = (message) => {
  return $('<div></div>', {
    addClass: 'ai-message py-2 d-flex flex-column',
  }).html(`
    <div class='fs-5'><i class='fas fa-robot'></i> AI</div>
    <div class='pb-2'><pre style='white-space: pre-wrap'>${message}</pre></div>
  `);
};

var btnSendMessage_onclick = function (event) {
  // Get required values
  const topicId = $('#txtTopicId').val();
  const message = $('#txtMessage').val();
  const $history = $('#divChatHistory');

  if (message === '') {
    $('#txtMessage').focus();
    return false;
  }

  // Create the human message
  const $humanMessage = createHumanMessage(message);
  $history.append($humanMessage);
  $history.scrollTop($history[0].scrollHeight);

  // Set request data
  var data = { topicId, message, noteIsAttached: false };
  if ($('#chkAddNote').prop('checked')) {
    Object.assign(data,
      {
        noteIsAttached: true,
        noteTitle: $('#title').val(),
        noteContent: quill.getText(),
      }
    )
  }

  // Request to the server
  $.ajax({
    url: '/api/chats',
    method: 'POST',
    data,
    success: (data, textStatus, jqXHR) => {
      // Create the AI message
      $('#txtTopicId').val(data.topicId);
      const $aiMessage = createAIMessage(data.message);
      $history.append($aiMessage);
      $history.scrollTop($history[0].scrollHeight);
    },
    error: (jqXHR, textStatus, errorThrown) => {
      alert('Error sending message!');
    }
  });

  // Clear the message
  $('#txtMessage').val('');
  $('#txtMessage').focus();

  // Prevent the form from submitting
  event.preventDefault();
  event.stopPropagation();
  return false;
};

var btnChatpanetoggle_onclick = function (event) {
  var $chatpane = $('aside.chatpane');
  var checked = $(event.target).prop('checked');
  if (checked) {
    $chatpane.addClass('open').removeClass('close');
  } else {
    $chatpane.addClass('close').removeClass('open');
  }
};

var btnChatpaneClear_onclick = function (event) {
  $('#divChatHistory').empty();
  $('#txtTopicId').val('');
  $('#txtMessage').val('').focus();
};

var document_onready = function () {
  $('#btnChatpaneToggle').on('click', btnChatpanetoggle_onclick);
  $('#btnSendMessage').on('click', btnSendMessage_onclick);
  $('#btnChatpaneClear').on('click', btnChatpaneClear_onclick);
};

$(document).ready(document_onready);
