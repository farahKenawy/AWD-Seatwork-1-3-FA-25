document.addEventListener("DOMContentLoaded", function () {
    const seatMap = document.getElementById("seat-map");
    const reserveBtn = document.getElementById("reserve-btn");
    const receiptContainer = document.getElementById("receipt-container");
    const receiptContent = document.getElementById("receipt-content");
    const rows = 4; // 4 rows
    const seatsPerRow = 5; // 5 seats per row
    const seatPrice = 350;
    let selectedSeats = [];

    const movieTitle = new URLSearchParams(window.location.search).get("movie") || "Default Movie"; // Get movie from URL or default
    const reservedSeatsKey = `reservedSeats_${movieTitle}`;
    const currentDate = new Date().toLocaleDateString(); // Get the current date as a string (MM/DD/YYYY)

    // Check if the reservations need to be reset for today
    const storedDate = localStorage.getItem("lastReservationDate");
    if (storedDate !== currentDate) {
        localStorage.removeItem(reservedSeatsKey); // Clear reservations for the new day
        localStorage.setItem("lastReservationDate", currentDate); // Set today's date
    }

    // Load reserved seats
    const reservedSeats = JSON.parse(localStorage.getItem(reservedSeatsKey) || "[]");

    // Render cinema seats with a layout
    const rowLabels = ['A', 'B', 'C', 'D']; // Row labels for seats
    for (let row = 0; row < rows; row++) {
        for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
            const seatNumber = row * seatsPerRow + seatIndex;
            const seat = document.createElement("div");
            seat.classList.add("seat");

            // Create seat label (e.g., A1, B1, C1, etc.)
            const seatLabel = document.createElement("span");
            seatLabel.classList.add("seat-label");
            seatLabel.textContent = `${rowLabels[row]}${seatIndex + 1}`;

            seat.appendChild(seatLabel);

            if (reservedSeats.includes(seatNumber)) {
                seat.classList.add("occupied");
            }

            seat.addEventListener("click", () => toggleSeat(seat, seatNumber));
            seatMap.appendChild(seat);
        }
    }

    function toggleSeat(seatElement, seatIndex) {
        if (seatElement.classList.contains("occupied")) {
            alert("This seat is already reserved.");
            return;
        }
        seatElement.classList.toggle("selected");
        if (selectedSeats.includes(seatIndex)) {
            selectedSeats = selectedSeats.filter(index => index !== seatIndex);
        } else {
            selectedSeats.push(seatIndex);
        }
    }

    reserveBtn.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const payment = document.getElementById("payment").value;

        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }

        const totalPrice = selectedSeats.length * seatPrice;
        const selectedSeatNumbers = selectedSeats.map(i => `${rowLabels[Math.floor(i / seatsPerRow)]}${(i % seatsPerRow) + 1}`).join(", ");
        const referenceNumber = generateReferenceNumber();

        // Update receipt content and display
        receiptContent.innerHTML = `
            <strong>Reference Number:</strong> ${referenceNumber} <br>
            <strong>Seats Reserved:</strong> ${selectedSeatNumbers} <br>
            <strong>Total Price:</strong> ₱${totalPrice} <br>
            <strong>Email:</strong> ${email} <br>
            <strong>Payment Method:</strong> ${payment}
        `;
        receiptContainer.classList.remove("hidden");

        // Update reserved seats in localStorage
        const updatedReservedSeats = Array.from(new Set([...reservedSeats, ...selectedSeats]));
        localStorage.setItem(reservedSeatsKey, JSON.stringify(updatedReservedSeats));

        // Mark seats as occupied
        selectedSeats.forEach(index => {
            const seat = seatMap.children[index];
            seat.classList.add("occupied");
            seat.classList.remove("selected");
        });

        selectedSeats = [];
    });

    // Function to generate a random 10-digit reference number
    function generateReferenceNumber() {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
});
