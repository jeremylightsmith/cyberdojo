var TabEntry = new function() {
	this.enable = function(id) {
		input = $("#" + id);
		
		input.keydown(function(e) {
		  if (e.keyCode == 9) {
		    insertAtCursor(input[0], "    ");
		    return false;
		  }
		})
    //    var downTab = function(evt) {
    //      if (evt.keyCode == 9) {
    //        return false;
    //      }
    //    }
    //    var upTab = function(evt) {
    //      if (evt.keyCode == 9) {
    //        return false;
    //      }
    //    }
    //    var checkTab = function(evt) {
    //      if (evt.keyCode == 9) {
    //        var top = input.scrollTop;
    //         // SelectionRange.insert(input, input.tab);
    //        input.scrollTop = top;
    //        return false;
    //      }
    //    }
    // 
    // if (input.selectionStart) {
    //   input.keydown(downTab);
    //   input.keyup(upTab);
    //   input.keypress(checkTab);
    // } else {
    //   input.keydown(downTab);
    //   input.keyup(checkTab);
    // }
	}
}

//http://alexking.org/blog/2003/06/02/inserting-at-the-cursor-using-javascript#comment-3817
function insertAtCursor(myField, myValue) {
  //IE support
  if (document.selection) {
    var temp;
    myField.focus();
    sel = document.selection.createRange();
    temp = sel.text.length;
    sel.text = myValue;
    if (myValue.length == 0) {
      sel.moveStart('character', myValue.length);
      sel.moveEnd('character', myValue.length);
    } else {
      sel.moveStart('character', -myValue.length + temp);
    }
    sel.select();
  }
  //MOZILLA/NETSCAPE support
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
  }
}
