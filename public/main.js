//TODO: DAY AND NIGHT MODE, COMMENTS SECTION
import "./jquery-3.5.0.min.js";

$(() => {
  //Disable img drag
  $("img").attr("draggable", false);

  //Header
  $(document).scroll(() => {
    if ($(document).scrollTop() > 80) $("#header").addClass("stick");
    else {
      $("#header").removeClass("stick");
    }
  });
  if ($(document).scrollTop() > 80) $("#header").addClass("stick");

  //Slides
  var introSlides = $(".introSlide");
  var projsSlides = $(".projsSlide");
  var introI = 0,
    projsI = 0,
    n = introSlides[0].offsetLeft,
    off = introSlides[1].offsetLeft - n;

  const leftButtons = $(".left");
  const rightButtons = $(".right");

  const moveRight = (slider) => {
    let offset;
    switch (slider) {
      case "intro":
        ++introI;
        if (introI >= introSlides.length) introI = 0;
        offset = n + introI * off;
        $("#introSlider").scrollLeft(offset);
        break;
      default:
        ++projsI;
        console.log(projsI);
        if (projsI >= projsSlides.length) projsI = 0;
        offset = n + projsI * off;
        $("#projsSlider").scrollLeft(offset);
    }
  };

  const moveLeft = (slider) => {
    let offset;
    switch (slider) {
      case "intro":
        --introI;
        if (introI < 0) introI = introSlides.length - 1;
        offset = n + introI * off;
        $("#introSlider").scrollLeft(offset);
        break;
      default:
        --projsI;
        console.log(projsI);
        if (projsI < 0) projsI = projsSlides.length - 1;
        offset = n + projsI * off;
        $("#projsSlider").scrollLeft(offset);
    }
  };

  $("#introRight").click(() => {
    moveRight("intro");
  });

  $("#introLeft").click(() => {
    moveLeft("intro");
  });

  $("#projsRight").click(() => {
    moveRight("projs");
  });
  $("#projsLeft").click(() => {
    moveLeft("projs");
  });

  var initX, finX;
  $("#introSlider")
    .mouseover(() => $("#introSlider").css({ cursor: "grab" }))
    .mousedown(() => {
      initX = event.clientX;
      $("#introSlider").css("cursor", "grabbing");
    })
    .mousemove(() => {})
    .mouseup(() => {
      finX = event.clientX;
      console.log(finX);
      $("#introSlider").css({ cursor: "grab" });
      if (finX - initX < 0) {
        moveRight("intro");
      } else if (finX - initX > 0) {
        moveLeft("intro");
      }
    });

  $("#projsSlider")
    .mouseover(() => $("#projsSlider").css({ cursor: "grab" }))
    .mousedown(() => {
      initX = event.clientX;
      $("#projsSlider").css("cursor", "grabbing");
    })
    .mousemove(() => {})
    .mouseup(() => {
      finX = event.clientX;
      console.log(finX);
      $("#projsSlider").css({ cursor: "grab" });
      if (finX - initX < 0) {
        moveRight("projs");
      } else if (finX - initX > 0) {
        moveLeft("projs");
      }
    });

  $(window).resize(() => {
    n = introSlides[0].offsetLeft;
    off = introSlides[1].offsetLeft - n;
  });

  $("#name").click(() => $("#name").css({ border: "none" }));
  $("#commentTextArea").click(() =>
    $("#commentTextArea").css({ border: "none" })
  );

  const move = () => {
    $("#projsSlider").scrollLeft(n + projsI * off);
  };
  $("#htmlcss").click(() => {
    projsI = 1;
    move();
  });
  $("#js").click(() => {
    projsI = 2;
    move();
  });
  $("#mern").click(() => {
    projsI = 3;
    move();
  });
  $("#socket").click(() => {
    projsI = 4;
    move();
  });

  //Comments
  const showNewComm = async () => {
    const comments = await axios.get(
      "https://portfolio-dab.herokuapp.com/comments"
    );
    $("#commentsList").append(
      `<li class='comment'><h3>${
        comments.data[comments.data.length - 1].name
      }</h3><p>${comments.data[comments.data.length - 1].comment}</p></li>`
    );
  };

  $("#submitComment").click((e) => {
    e.preventDefault();

    if ($("#name").val() == "") $("#name").css({ border: "1px solid red" });
    else if ($("#commentTextArea").val() == "")
      $("#commentTextArea").css({ border: "1px solid red" });
    else {
      axios
        .post("https://portfolio-dab.herokuapp.com/comments", {
          name: $("#name").val(),
          comment: $("#commentTextArea").val(),
        })
        .then((res) => {
          $("#name").val("");
          $("#commentTextArea").val("");
          $("#success").addClass("displaySuccess");
          setTimeout(() => $("#success").removeClass("displaySuccess"), 3500);

          showNewComm();

          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  });

  const getComments = async () => {
    const comments = await axios.get(
      "https://portfolio-dab.herokuapp.com/comments"
    );
    for (var i in comments.data) {
      $("#commentsList").append(
        `<li class='comment'><h3>${comments.data[i].name}</h3><p>${comments.data[i].comment}</p></li>`
      );
    }

    console.log(comments.data);
  };

  getComments();
});
