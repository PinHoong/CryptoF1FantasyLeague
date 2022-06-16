(function() {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.button');
    const display = document.querySelector('.display');
    
    let deg = 0;
    let zoneSize = 46; // deg
  
    // Counter clockwise
    const symbolSegments = {
      1: "0.1",
      2: "0.06",
      3: "0.05",
      4: "0.2",
      5: "0.04",
      6: "0.03",
      7: "0.02",
      8: "0.1",
    }
  
    const handleWin = (actualDeg) => {
      const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
      display.innerHTML = '<i class="fa-brands fa-ethereum">' + symbolSegments[winningSymbolNr] + '</i>';
      var winningTicket = symbolSegments[winningSymbolNr];
      localStorage.setItem('winningTicket', JSON.stringify(winningTicket));
    }
  
    startButton.addEventListener('click', () => {
      // Reset display
      display.innerHTML = "-";
      // Disable button during spin
      startButton.style.pointerEvents = 'none';
      // Calculate a new rotation between 5000 and 10 000
      deg = Math.floor(5000 + Math.random() * 5000);
      // Set the transition on the wheel
      wheel.style.transition = 'all 10s ease-out';
      // Rotate the wheel
      wheel.style.transform = `rotate(${deg}deg)`;
      // Apply the blur
      wheel.classList.add('blur');
    });
  
    wheel.addEventListener('transitionend', () => {
      // Remove blur
      wheel.classList.remove('blur');
      // Enable button when spin is over
      startButton.style.pointerEvents = 'auto';
      // Need to set transition to none as we want to rotate instantly
      wheel.style.transition = 'none';
      // Calculate degree on a 360 degree basis to get the "natural" real rotation
      // Important because we want to start the next spin from that one
      // Use modulus to get the rest value
      const actualDeg = deg % 360;
      // Set the real rotation instantly without animation
      wheel.style.transform = `rotate(${actualDeg}deg)`;
      // Calculate and display the winning symbol
      handleWin(actualDeg);
      const winningTkt = JSON.parse(localStorage.getItem('winningTicket'))
      Swal.fire({
        title: 'Sweet!',
        html: 'You Won ' + winningTkt + ' | ' + '<a href="#"> Claim Now </a>',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    });
  })();