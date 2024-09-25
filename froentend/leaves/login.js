document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch user data with embedded employee data

        // http://localhost:3000/users?_embed=employee&username=EMP_L6Zae&password=pwd123

        const response = await fetch(`http://localhost:4000/users?username=${username}&password=${password}&_embed=employee`);

        const users = await response.json();

        if (users.length > 0) {
            const user = users[0];
            // Find the associated employee data
            const employee = user.employee;

            //console.log(employee);

            if (employee) {
                // Store the logged-in user and employee details
                const loggedInUser = {
                    username: user.username,
                    employeeId: employee.employeeId,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    role: user.role
                };

                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                alert('Login successful!');
                window.location.href = 'leaveRequest.html';
            } else {
                alert('Employee data not found.');
            }
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    }
});