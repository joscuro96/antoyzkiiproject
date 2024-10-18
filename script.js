let appointments = [];

// Calendar Functionality
const calendarElement = document.getElementById('calendar');
const appointmentForm = document.getElementById('appointmentForm');
const dateInput = document.getElementById('date');

function renderCalendar() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendarHTML = '<div class="calendar-header"><h2>' + date.toLocaleString('default', { month: 'long' }) + ' ' + year + '</h2></div>';
    calendarHTML += '<div class="calendar-grid">';

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const fullDate = `${year}-${month + 1}-${day}`;
        const isBooked = appointments.some(appointment => appointment.date === fullDate);
        calendarHTML += `
            <div class="calendar-day" data-date="${fullDate}" ${isBooked ? 'style="background-color: #f44336; cursor: not-allowed;"' : ''}>
                ${day} ${isBooked ? '(Booked)' : ''}
            </div>`;
    }

    calendarHTML += '</div>';
    calendarElement.innerHTML = calendarHTML;

    // Add click event to each day
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', function() {
            if (this.dataset.date && !this.style.backgroundColor.includes('red')) {
                dateInput.value = this.dataset.date; // Set the hidden date input
                appointmentForm.style.display = 'block'; // Show the form
            }
        });
    });
}

// Handle form submission
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const appointmentList = document.getElementById('appointmentList');
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - ${date} at ${time}`;
    appointmentList.appendChild(listItem);

    // Add the appointment to the array
    appointments.push({ name, date, time });

    // Clear form fields
    appointmentForm.reset();
    appointmentForm.style.display = 'none'; // Hide the form

    // Re-render calendar to update booked dates
    renderCalendar();
});

// Initial rendering of the calendar
renderCalendar();
