

  src="https://code.jquery.com/jquery-1.9.1.min.js"
  integrity="sha256-wS9gmOZBqsqWxgIVgA8Y9WcQOa7PgSIX+rPA0VL2rbQ="
  crossorigin="anonymous">
  
	$(document).ready(function() {
		/* func
		---------------------------------------------------------- */
		// 초중종성 INDEX값을 문자료 변환
		var makeChar = function(i, m, t) {
			var code = ((i * 21) + m) * 28 + t + 0xAC00;
			return String.fromCharCode(code);
		}
		var iChrIndex = function(chr) {
			var index = ((chr.charCodeAt(0) - 0xAC00) / 28) / 21;
			return parseInt(index);
		}
		var mChrIndex = function(chr) {
			var index = ((chr.charCodeAt(0)- 0xAC00) / 28) % 21;
			return parseInt(index);
		}
		var tChrIndex = function(chr) {
			var index = (chr.charCodeAt(0) - 0xAC00) % 28;
			return parseInt(index);
		}
	
		/* var
		---------------------------------------------------------- */
		// 초성INDEX
		var indexI = [
			  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 
			  'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 
			  'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
	
		// 중성INDEX
		var indexM = [
			  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 
			  'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 
			  'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 
			  'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ];
	
		// 종성INDEX
		var indexT = [
			  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 
			  'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 
			  'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']; 
	
		// 조합INDEX
		var indexJComb1 = ['ㄳ','ㄵ','ㄶ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅄ'];
		var indexJComb2 = ['ㄱㅅ','ㄴㅈ','ㄴㅎ','ㄹㄱ','ㄹㅁ','ㄹㅂ','ㄹㅅ','ㄹㅌ','ㄹㅍ','ㄹㅎ','ㅄ'];
		var indexMComb1 = ['ㅘ','ㅙ','ㅚ','ㅝ','ㅞ','ㅟ','ㅢ'];
		var indexMComb2 = ['ㅗㅏ','ㅗㅐ','ㅗㅣ','ㅜㅓ','ㅜㅔ','ㅜㅣ','ㅡㅣ'];
	
		// 호환용 한글 자모 (3130~318F)
		var jaCode = 'ㄱ'.charCodeAt(0);
		var jaCodeLast = 'ㅎ'.charCodeAt(0);
		var moCode = 'ㅏ'.charCodeAt(0);
		var moCodeLast = 'ㅣ'.charCodeAt(0);
	
		/* start
		---------------------------------------------------------- */
		// test input
		var $input = $('#test-inputbox');

		
	
		// event
		$('#virtual-keyboard').on('click', 'li', function() {
			var chr = $(this).text();
			var text = $input.val();
	
			$input.focus();
	
			var chrCode = chr.charCodeAt(0);
			var isJa = jaCode <= chrCode && chrCode <= jaCodeLast;
			var isMo = moCode <= chrCode && chrCode <= moCodeLast;
	
			if (text) {
				var lastChr = text.substring(text.length - 1);
				var lastChrCode = lastChr.charCodeAt(0);
				if (jaCode <= lastChrCode && lastChrCode <= moCodeLast) {
					// 자음,모음
					if (jaCode <= lastChrCode && lastChrCode <= jaCodeLast) {
						if (isMo) {
							var i = indexI.indexOf(lastChr);
							var m = indexM.indexOf(chr);
							var t = 0;
							var c = makeChar(i, m, t);
							$input.val(text.substring(0, text.length-1) + c);
							return;
						}
					} else if (moCode <= lastChrCode && lastChrCode <= moCodeLast) {
					}
				} else if (lastChrCode >= 0xAC00 && lastChrCode <= 0xAC00 + 0x2BA4) {
					// 한글
					var i = iChrIndex(lastChr);
					var m = mChrIndex(lastChr);
					var t = tChrIndex(lastChr);
					if (t == 0) {
						// 종성이 없는경우
						if (isJa) {
							t = indexT.indexOf(chr);
							var c = makeChar(i, m, t);
							$input.val(text.substring(0, text.length-1) + c);
							return;
						} else if (isMo) {
							// 모음조합문자
							var chkChr = indexM[m] + chr;
							var combIndex = indexMComb2.indexOf(chkChr);
							if (combIndex!=-1) {
								var combChr = indexMComb1[combIndex];
								m = indexM.indexOf(combChr);
								var c = makeChar(i, m, t);
								$input.val(text.substring(0, text.length-1) + c);
								return;
							}
						}
					} else {
						// 종성이 있는경우
						if (isMo) {
							var tChr = indexT[t];
	
							// 조합문자일경우 다시 쪼갠다
							var combIndex = indexJComb1.indexOf(tChr);
							if (combIndex!=-1) {
								var partChr = indexJComb2[combIndex];
								t = indexT.indexOf(partChr[0]);
								tChr = partChr[1];
							} else {
								t = 0;
							}
	
							var c1 = makeChar(i, m, t);
							i = indexI.indexOf(tChr);
							if (i!=-1) {
								m = indexM.indexOf(chr);
								var c2 = makeChar(i, m, 0);
								$input.val(text.substring(0, text.length-1) + c1 + c2);
								return;
							}
						} else if (isJa) {
							// 자음조합문자
							var chkChr = indexT[t] + chr;
							var combIndex = indexJComb2.indexOf(chkChr);
							if (combIndex!=-1) {
								var combChr = indexJComb1[combIndex];
								t = indexT.indexOf(combChr);
								var c = makeChar(i, m, t);
								$input.val(text.substring(0, text.length-1) + c);
								return;
							}
						}
					}
				} else {
					// 없는 문자
				}
			}
			$input.val(text + chr);
		});
	});
	