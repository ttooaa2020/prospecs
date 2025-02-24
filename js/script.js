$(function () {
  const $window = $(window);
  const $header = $("header");
  const $visual = $(".visual, .main-visual");
  const $topBtn = $(".top-btn");
  const $menu = $(".language");
  const $submenu = $(".language-list");

  const duration = 300;

  // 헤더, 탑버튼이 비주얼을 벗어 나갈때----------------------------------------------------------
  $window.on("scroll", function () {
    const visualBottom = $visual.offset().top + $visual.outerHeight() - 200;
    const scrollTop = $window.scrollTop();

    if (scrollTop > visualBottom) {
      $header.addClass("scrolled");
    } else {
      $header.removeClass("scrolled");
    }
  });
  // 탑 버튼 클릭 이벤트
  $topBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 100, function () {
      $header.removeClass("hide"); //탑버튼 누를시 헤더가 나옴
    });
  });

  // 키보드에 홈 버튼을 눌렀을때도 헤더가 내려옴
  $(document).on("keydown", function (e) {
    if (e.key === "Home") {
      // Home 키가 눌렸을 때
      $("html, body").animate({ scrollTop: 0 }, 100, function () {
        $header.removeClass("hide"); // 헤더를 보이게 함
      });
    }
  });
  // 헤더, 탑버튼이 비주얼을 벗어 나갈때------------------------------------------------------------

  // 모바일 더보기
  const $btnmenu = $(".mobile-more-btn");
  const $mobilemenu = $(".mobile-menu");
  const $btnClose = $(".mobile-btn-close");

  $btnmenu.on("click", () => {
    $mobilemenu.addClass("active");
  });

  $btnClose.on("click", () => {
    $mobilemenu.removeClass("active");
  });
  // 모바일 더보기 end

  // 제품 스와이퍼
  if (document.querySelector(".course-list")) {
    const courseSwiper = new Swiper(".course-list", {
      speed: 1000,
      loop: true,
      slidesPerView: 5,
      centeredSlides: true,

      breakpoints: {
        320: {
          slidesPerView: 1.5,
          spaceBetween: 10,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
          centeredSlides: true,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
          centeredSlides: true,
        },
      },

      navigation: {
        nextEl: ".course-button-next",
        prevEl: ".course-button-prev",
      },
    });
  }

  // 탭 메뉴
  const $tabmenu = $(".lend-tabmenu > button");
  const $tabCon = $(".lend-tabcon-item");

  tabAction(0);

  // 탭메뉴를 클릭 했을때
  $tabmenu.on("click", function (e) {
    // a의 기본 동작막기
    e.preventDefault();

    // 선택한 탭메뉴의 인덱스 구하기
    const tabIdx = $(this).index();
    console.log(tabIdx);

    tabAction(tabIdx);
  });

  // 공통의 동작을 함수로 정의
  function tabAction(index) {
    // 탭메뉴 활성화
    $tabmenu.removeClass("on");
    $tabmenu.eq(index).addClass("on");

    // 인덱스에 해당하는 $tabCon 보이기
    $tabCon.hide();
    $tabCon.eq(index).show();
  }
  // 탭 메뉴 끝

  // phone-con------------------------------------------------------------
  const swiperContainer = document.querySelector(".phone-con");
  // 스와이퍼
  if (swiperContainer) {
    const swiper = new Swiper(".phone-con", {
      // Optional parameters
      initialSlide: 0,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      loop: true,
      speed: 300,
      effect: "fade",
      allowTouchMove: true, //드래그 하듯 넘길수 있도록
      grabCursor: true, //마우서 커서 변경 되도록

      // Pagination 추가
      pagination: {
        el: ".phone-pagination",
        clickable: true,
      },
      on: {
        init: function () {
          updateCardText(this.realIndex);
        },
        slideChange: function () {
          updateCardText(this.realIndex);
        },
      },
    });
    // 스와이퍼 end

    // Intersection Observer 설정 (보일때 작동)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            swiper.autoplay.start();
          } else {
            swiper.autoplay.stop();
          }
        });
      },
      { threshold: 0.5 }
    ); // 50% 이상 보일 때 감지

    // Swiper 컨테이너 관찰 시작 (폰과 텍스트 연동)
    observer.observe(swiperContainer);
    function updateCardText(index) {
      const cardTexts = document.querySelectorAll(".text-con");
      cardTexts.forEach((cardText, i) => {
        if (i === index) {
          cardText.classList.add("on");
        } else {
          cardText.classList.remove("on");
        }
      });
    }

    // 페이지 로드 시 첫 번째 요소 활성화
    document.addEventListener("DOMContentLoaded", () => {
      updateCardText(0);
    });
  }

  // phone-con end------------------------------------------------------------

  // question------------------------------------------------------------
  const $question = $(".question-list > li");
  const $answer = $(".answer-wrap");
  const $questionList = $(".question-list");

  // 초기 상태 설정
  $answer.hide();

  // 질문을 클릭했을 때
  $question.on("click", function (e) {
    e.stopPropagation(); // 이벤트 버블링 방지
    // 선택한 항목을 제외한 다른 항목들의 on 클래스 제거 및 답변 숨기기
    $(this).siblings().removeClass("on").find($answer).stop().slideUp(duration);

    // 선택한 항목의 on 클래스 토글 및 답변 토글
    $(this).toggleClass("on");
    $(this).find($answer).stop().slideToggle(duration);
  });

  // 문서 전체에 클릭 이벤트 추가
  $(document).on("click", function (e) {
    // 클릭된 요소가 질문 리스트 내부가 아닐 경우
    if (!$(e.target).closest($questionList).length) {
      $question.removeClass("on");
      $answer.stop().slideUp(duration);
    }
  });
  // question end------------------------------------------------------------
});
