// Main 페이지 JS

/////전역변수구역//////////////////////
var acall; //setInterval함수용
var acallT;//setTimeout함수용
/////////////////////////////////////////
$(function(){//jQB//////////////////////////////
	
	// 드래그 기능 설정
	$(".draggable").draggable({
		axis:"x" //x축고정
	});////draggable///////////
	
	/////////// 드래그 슬라이드 구현////////
	// 1. left값을 px로 계산하여 셋팅하기
	// - 화면크기와 같은 left값을 설정함
	var win = $(window).width();//화면크기
	$("#banner>ul").css({
		left: -win+"px"
	});///css////
	
	$(".draggable").on("dragstop touchend",function(e){
//		e.preventDefault();
		var cLeft = $(this).offset().left;//현재 ul left값
//		console.log(cLeft);
		if(cLeft<-win*1.1){//왼쪽이동시 -110%보다 더 이동시
			$(this).stop()
			.animate({left:-win*2+"px"},800,"easeOutCirc",
			function(){//이동후 변경
				$(this).append($("li",this).first())//맨앞장 맨뒤로
				.css({left:-win+"px"});//css 원상복귀!
							
				//블릿체크 후 블릿색변경하기
				// 2번째 있는(화면에 보이는) li의 class를 읽어서 변형함
				var bseq = Number($("li",this).eq(1).attr("class").substr(3));
//				console.log($("li",this).eq(1).attr("class"));
				$(".bindic>li").eq(bseq-2).addClass("bcolor")
				.siblings().removeClass("bcolor");
				
				//글자등장 함수호출
				banAction();
				//자동넘김 멈춤
				clearInterval(acall);
				clearTimeout(acallT);
				//8초간 아무런 동작이 없으면 다시 자동호출실행
				acallT = setTimeout(autoFunc,8000);
				
			});/////ani
		}//if///
		else if(cLeft>-win*0.9){
			//오른쪽으로 이동시 -90% 보다 커질때 이동
			$(this).stop()
			.animate({left:"0px"},800,"easeOutCirc",
			function(){//이동 후 변경
				$(this).prepend($("li",this).last()) //맨뒤것 맨앞
				.css({left:-win+"px"});
				
				
				//블릿체크 후 블릿색변경하기
				// 2번째 있는(화면에 보이는) li의 class를 읽어서 변형함
				var bseq = Number($("li",this).eq(1).attr("class").substr(3));
				$(".bindic>li").eq(bseq-2).addClass("bcolor")
				.siblings().removeClass("bcolor");
				
				//글자등장 함수호출
				banAction();
				//자동넘김 멈춤
				clearInterval(acall);
				clearTimeout(acallT);
				//8초간 아무런 동작이 없으면 다시 자동호출실행
				acallT = setTimeout(autoFunc,8000);
				
				
			});//ani
			
		}//else if///
		else{//이동범위가 아니면 원래 위치로 가기
			$(this).stop().animate({left:-win+"px"},300);
		}///else///
		
	});/////드래그 터치//////////////////////
	
	//////////////  배너 블릿 클릭시 배너 이동하기/////////
	$(".bindic>li").click(function(){
		var idx = $(this).index();//블릿 li 순번
		///////블릿변경하기////////////////
		$(".bindic>li").eq(idx).addClass("bcolor")
		.siblings().removeClass("bcolor");
		////////////////////////////////////////
		var bno = Number($(".draggable li").eq(1).attr("class").substr(3));//현재 보이는 배너의 클래스명의 번호
		var diff = idx-bno+2;//찍은 블릿순번과 현재 배너번호 차이(2차이 보정)-> 방향(+,-), 이동회수
		if(idx===4&&bno===1){diff=-1;}//예외처리
		if(idx===5&&bno===1){diff=0;}//예외처리
		if(idx===2&&bno===1){diff=-3;}//예외처리
		if(idx===3&&bno===1){diff=-2;}//예외처리
		if(idx===1&&bno===1){diff=-4;}//예외처리
		if(idx===0&&bno===1){diff=-5;}//예외처리
		console.log(idx+"/"+bno+"/"+diff);
		//방향에 따라 이동하기
		if(diff>0){//오른쪽이동(들어옴)
			var diffnew1=diff+1, diffnew2=diff;//변경처리
			/////예외처리: 1번 페이지에서 6번 블릿 클릭시///
			if(bno===2 && idx===5){
				$(".draggable")
				.append($(".draggable li").first())
				.css({left:"0"});
				diffnew1=diff;//예외처리변경
				diffnew2=diff-1;//예외처리변경
			}///if////			
			/////////////////////////////////////////////////////
			
				$(".draggable").stop()
				.animate({
					left:-win*(diffnew1)+"px"
				},800,"easeOutCirc",
				function(){//이동후 변경					
					for(var i=0; i<diffnew2;i++){
						//이동회수만큼 처리함
						$(this).append($("li",this).first());
						//맨앞장 맨뒤로				
					}////for문////
					$(this).css({left:-win+"px"});//css 원상복귀!
										
					//글자등장 함수호출
					banAction();
					
				});//ani///////////////////////////////
		}//if////////////////////////////////////////
		else if(diff<0){//왼쪽이동(들어옴)
			// 먼저 이동 개수 만큼 이미지 이동 및 css left값 변경
			for(var i=0; i<-diff;i++){//이동회수만큼 처리함
				$(".draggable")
				.prepend($(".draggable li").last())
				//맨앞장 맨뒤로		
				.css({left:-win*(i+2)+"px"});//css 앞에 추가된 개수만큼 값 변경!
			}////for문////
			
			//이동 애니메이션
			$(".draggable").stop()
				.animate({
					left:-win+"px"//하나 나가있는 위치로 이동
				},800,"easeOutCirc",function(){
				
				//글자등장 함수호출
				banAction();
				
			});/////ani///////
		}///else if///		
		
		//자동넘김 멈춤
		clearInterval(acall);
		clearTimeout(acallT);
		//8초간 아무런 동작이 없으면 다시 자동호출실행
		acallT = setTimeout(autoFunc,8000);
		
	});///click//////////////////////////////////////
	
	//배너 글자 등장 함수 호출
	setTimeout(banAction,1500);
	
	////////////햄버거버튼 클릭시 애니메이션//////
	var hamsts=0;//햄버거상태값(0-처음상태, 1-닫기상태)
	$("#ham").click(function(){
		if(hamsts===0){//닫기버튼으로 변형하기
			// 1. 첫번째 햄버거 막대기
			$(">span",this).eq(0).animate({
				rotate:"45deg", top:"10px"
			},200);
			// 2. 세번째 햄버거 막대기
			$(">span",this).eq(2).animate({
				rotate:"-45deg", top:"10px"
			},200);
			// 3. 두번째 햄버거 막대기
			$(">span",this).eq(1).animate({
				width: "0", left: "50%"
			},200);
			hamsts=1;//상태변경
			
			//전체메뉴 박스 나타나기
			$("#menu").fadeIn(300);			
			
			//비디오 플레이 하기(DT일때만)
			if(msts===0){				
				$("#menu>video").get(0).play();
			}
			
			
		}//if///
		else{///처음상태로 변형하기
			// 1. 첫번째 햄버거 막대기
			$(">span",this).eq(0).animate({
				rotate:"0deg", top:"0px"
			},200);
			// 2. 세번째 햄버거 막대기
			$(">span",this).eq(2).animate({
				rotate:"0deg", top:"20px"
			},200);
			// 3. 두번째 햄버거 막대기
			$(">span",this).eq(1).animate({
				width: "100%", left: "0"
			},200);
			hamsts=0;//상태변경		
			
			//전체메뉴 박스 숨기기
			$("#menu").fadeOut(300);		
			
			//비디오 멈추기기(DT일때만)
			if(msts===0){				
				$("#menu>video").get(0).pause();
			}
			
		}///else///		
	});//click///////////
	
	
	
	
});///jQB/////////////////////////////////////////


/*
	함수명: banAction
	기능: 각 배너 페이지에 도착시 글자등장 애니메이션하기
*/
function banAction(){
	///// 화면에 보이는 배너는 두번째 이므로
	$(".draggable li").eq(1).find("h1")
	.animate({
		top: "50%", opacity:1
	},300,"easeOutCirc")
	.parent().siblings().find("h1")//다른 li의  h1
	.animate({
		top:"60%", opacity:0
	},300,"easeOutCirc");
	
}///banAction함수////////////////////////////////////

$(function(){//jQB2///////////////////////////////
	//배너 자동 넘김 함수 호출
	autoFunc();
	
	
});//jQB2///////////////////////////////////////////

/*
	함수명 : autoFunc
	기능 : 자동 호출용 함수
*/
function autoFunc(){
	acall = setInterval(autoSlide, 3000);	
}///autoFunc함수//////////////////////////////////////




/*
	함수명: autoSlide
	기능: 배너 자동넘기기
*/
function autoSlide(){
	var win = $(window).width();//화면크기
	var cLeft = $(".draggable").offset().left;//현재 ul left값
//		console.log(cLeft);
	$(".draggable").stop()
	.animate({left:-win*2+"px"},800,"easeOutCirc",
	function(){//이동후 변경
		$(this).append($("li",this).first())//맨앞장 맨뒤로
		.css({left:-win+"px"});//css 원상복귀!

		//블릿체크 후 블릿색변경하기
		// 2번째 있는(화면에 보이는) li의 class를 읽어서 변형함
		var bseq = Number($("li",this).eq(1).attr("class").substr(3));
//				console.log($("li",this).eq(1).attr("class"));
		$(".bindic>li").eq(bseq-2).addClass("bcolor")
		.siblings().removeClass("bcolor");

		//글자등장 함수호출
		banAction();

	});/////ani
	
	
}////autoSlide함수/////////////////////////////////////









