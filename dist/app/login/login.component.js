"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let LoginComponent = class LoginComponent {
    username = '';
    password = '';
    showPassword = false;
    // Toggle password visibility
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    // Handle form submission
    onSubmit() {
        // Check that the required fields are filled
        if (!this.username || !this.password) {
            alert('Please enter both username and password.');
            return;
        }
        // Send fetch request to login API
        fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.username, password: this.password })
        })
            .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username or password');
            }
            return response.json();
        })
            .then(data => {
            alert(data.message || 'Login successful!');
            // You can redirect the user or take any other action here
        })
            .catch(error => {
            alert(error.message);
        });
    }
};
exports.LoginComponent = LoginComponent;
exports.LoginComponent = LoginComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-login',
        standalone: true,
        imports: [],
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
//# sourceMappingURL=login.component.js.map