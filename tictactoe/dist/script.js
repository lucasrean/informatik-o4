$(document).ready(function(){
	//  Setup für Array um benutzte Felder zu erkennen
	var boardChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	var turnCount = 0;

	// Spieler startet mit X und spielt per Default gegen den Computer
	var player = $("input:radio[name=player]:checked").val();
	var opponent = $("input:radio[name=opponent]:checked").val();

	// Spielerwechsel erfassen
	$("input:radio[name=player]").click(function() {
   		player = $(this).val();
	});

	// Gegnerwechsel erfassen
	$("input:radio[name=opponent]").click(function() {
   		opponent = $(this).val();
	});

	// Schaltflächen-Listener zurücksetzen
	$("#reset").click(function(){
		gameReset();
	});

	// Setup für Click Listener jedes Feldes
	//  Die Funktion validiert das Quadrat und setzt es auf den Spieler
	// überprüft den Gewinner
	for (var i=1; i<=9; i++){
		$("#cell"+i).on("click", function (){
			// Jedes Feld kann nur einmal besetzt werden
			// Mit Logik Operator wird überprüft ob ein Symbol schon auf einem Feld ist oder nicht
			if ($(this).hasClass("bg1") || $(this).hasClass("bg2")) {
					alert("Allready in use!!");
			} else {
				// Stellt das Feld auf das entsprechende Spiel ein
				if (player ==="X") {			
					$(this).addClass("bg1");
				} else {
				
					$(this).addClass("bg2");
				}			
				// Entfernt Feld von benutzbaren Optionen
				var id = $(this).attr("id");
				var indexValue = parseInt(id.substr(-1));
				var index = boardChoices.indexOf(indexValue);
				boardChoices.splice(index, 1);
				// Überprüft ob Spieler gewinnt
				player = playerTurn(player);
			}		
		}); // beendet auf Klick
	} // Ende des loops

	function playerTurn (player) {
		turnCount ++;
		if (player ==="X") {			
			win = checkForWinner("bg1");	
			if (win){
				alert("X is the WINNER!!");
				gameReset();
			}
			$('#r1').prop("checked", false);
			$('#r2').prop("checked", true);	
			player = "O";	
			// Zug des Computers wenn mit Computer gespielt wird
			if (opponent === "computer"){
				 player = computerTurn(player);
			}
		} else {
			// Spieler ist 0
			win = checkForWinner("bg2");
			if (win){
				alert("O is the WINNER!!");
				gameReset();
			}
			$('#r1').prop("checked", true);
			$('#r2').prop("checked", false);
			player = "X";
			// Zug des Computers wenn mit Computer gespielt wird
			if (opponent === "computer"){
				player = computerTurn(player);
			}
		}
		return player;
	}

	function computerTurn(player) {
		turnCount ++;
		// Suche eines verfügbaren Feldes
		var rs = boardChoices[Math.floor(Math.random() * boardChoices.length)];
		// 	Spieler-Symbol setzen und auf Gewinner prüfen
		if (player ==="X") {			
			$("#cell"+rs).addClass("bg1");
			win = checkForWinner("bg1");
			$('#r1').prop("checked", false);
			$('#r2').prop("checked", true);	
			player = "O";
		} else {
			// Spieler ist 0
			$("#cell"+rs).addClass("bg2");
			win = checkForWinner("bg2");
			$('#r1').prop("checked", true);
			$('#r2').prop("checked", false);	
			player = "X";
		}	
		// Hat der Computer gewonnen?
		if (win){
			alert("Computer is the WINNER!!");
			gameReset();
		}		
		// Entferne das Feld von der verfügbaren Liste
		var indexValue = parseInt(rs);
		var index = boardChoices.indexOf(indexValue);
		boardChoices.splice(index, 1);		
		return player;
	}

	function checkForWinner(elClass){
		// Check rows
		if ($("#cell1").hasClass(elClass) && $("#cell2").hasClass(elClass) &&
				$("#cell3").hasClass(elClass)) {
			return true;
		} 
		if ($("#cell4").hasClass(elClass) && $("#cell5").hasClass(elClass) &&
				$("#cell6").hasClass(elClass)) {
			return true;
		} 
		if ($("#cell7").hasClass(elClass) && $("#cell8").hasClass(elClass) &&
				$("#cell9").hasClass(elClass)) {
			return true;
		} 
		// Überprüfe columns
		if ($("#cell1").hasClass(elClass) && $("#cell4").hasClass(elClass) &&
				$("#cell7").hasClass(elClass)) {
			return true;
		} 
		if ($("#cell2").hasClass(elClass) && $("#cell5").hasClass(elClass) &&
				$("#cell8").hasClass(elClass)) {
			return true;
		} 
		if ($("#cell3").hasClass(elClass) && $("#cell6").hasClass(elClass) &&
				$("#cell9").hasClass(elClass)) {
			return true;
		} 
		// Überprüfe die Diagonale
		if ($("#cell1").hasClass(elClass) && $("#cell5").hasClass(elClass) &&
				$("#cell9").hasClass(elClass)) {
			return true;
		} 
		if ($("#cell3").hasClass(elClass) && $("#cell5").hasClass(elClass) &&
				$("#cell7").hasClass(elClass)) {
			return true;
		} 
		// Wenn alle 9 Felder ausgefüllt sind und es keinen Gewinner gibt Unentschieden
		if (turnCount === 9) {
			alert("TIE!!");
			gameReset();
		}	
	}

	function gameReset(){
		for (var i=1; i<=9; i++){
			$("#cell"+i).removeClass('bg1 bg2');
		}
		boardChoices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		turnCount = 0;
		var player = $("input:radio[name=player]:checked").val();
	}



});