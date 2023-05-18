function moreInfo(id) {
    document.getElementById(id).style.display = "block";
  }

 // $('#click').on('click', function () {
    if ($('#click').text() === 'show') {

        // This block is executed when
        // you click the show button
        $('#click').text('hide');
        $('#element').css('display', 'flex');
    }
    else {

        // This block is executed when
        // you click the hide button
        $('#click').text('show');
        $('#element').css('display', 'none');
    }
//});