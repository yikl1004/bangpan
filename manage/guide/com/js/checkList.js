$(function(){
	
	

	for(var i = 0 ; i < $('.waChkLst.blue .bg_dep02').parent('tbody').length ; i ++){
		
		sum1 = 0;
		sum2 = 0;
		sum3 = 0;
		listNum = $('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr').length;

		for(var j = 0; j < listNum ; j ++)
		{

			if($('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr').eq(j).children('td').eq(1).text()=="Y")
			{
				sum1Num = 1
			}
			else{
				sum1Num = 0
			}

			if($('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr').eq(j).children('td').eq(2).text()=="Y")
			{
				sum2Num = 1
			}
			else{
				sum2Num = 0
			}

			if($('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr').eq(j).children('td').eq(3).text()=="Y")
			{
				sum3Num = 1
			}
			else{
				sum3Num = 0
			}

			sum1 += sum1Num;
			sum2 += sum2Num;
			sum3 += sum3Num;

			sum1v = $('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr.bg_dep02').children('td').eq(1);
			sum2v = $('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr.bg_dep02').children('td').eq(2);
			sum3v = $('.waChkLst.blue .bg_dep02').parent('tbody').eq(i).children('tr.bg_dep02').children('td').eq(3);
			// 소항목별 평균
			sum1v.text(Math.ceil(sum1 *  (100/(listNum-1))))
			sum2v.text(Math.ceil(sum2 *  (100/(listNum-1))))
			sum3v.text(Math.ceil(sum3 *  (100/(listNum-1))))

		}
	}
	
	sum1t = 0;
	sum2t = 0;
	sum3t = 0;
	
	listNum0 = $('.waChkLst.blue').length;

	for(i = 0; i < listNum0 ; i ++){
		
		sum1 = 0;
		sum2 = 0;
		sum3 = 0;

		listNum = $('.waChkLst.blue').eq(i).find('tbody').length;
		for(j = 0; j < listNum ; j ++){
			
			

			sum1 += Number($('.waChkLst.blue').eq(i).find('.bg_dep02').eq(j).children('td').eq(1).text());
			sum2 += Number($('.waChkLst.blue').eq(i).find('.bg_dep02').eq(j).children('td').eq(2).text());
			sum3 += Number($('.waChkLst.blue').eq(i).find('.bg_dep02').eq(j).children('td').eq(3).text());
			// 대항목별 평균
			$('.waChkLst.blue').eq(i).find('.bg_dep01').children('td').eq(1).text(Math.ceil(sum1 /(listNum-1)));
			$('.waChkLst.blue').eq(i).find('.bg_dep01').children('td').eq(2).text(Math.ceil(sum2 /(listNum-1)));
			$('.waChkLst.blue').eq(i).find('.bg_dep01').children('td').eq(3).text(Math.ceil(sum3 /(listNum-1)));
			
			
		}

		//최종 평균점수 구하기
		sum1t += Math.ceil((Number($('.waChkLst.blue').eq(i).find('.bg_dep01').children('td').eq(1).text())) / listNum0);
		sum2t += Math.ceil((Number($('.waChkLst.blue').eq(i).find('.bg_dep01').children('td').eq(2).text())) / listNum0);
		sum3t += Math.ceil((Number($('.waChkLst.blue').eq(i).find('.bg_dep01').children('td').eq(3).text())) / listNum0);
		
		$(".waChkScore.blue tr:last-child td").eq(1).text(sum1t);
		$(".waChkScore.blue tr:last-child td").eq(3).text(sum2t);
		$(".waChkScore.blue tr:last-child td").eq(5).text(sum3t);

		
	}

	

});
