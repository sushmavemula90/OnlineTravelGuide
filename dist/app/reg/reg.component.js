"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let RegComponent = class RegComponent {
    fullname = '';
    username = '';
    email = '';
    phone = '';
    password = '';
    confirmPassword = '';
    // Validate password requirements
    validatePassword(password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUppercase && hasNumber && hasSpecial;
    }
    // Form submission handler
    onSubmit() {
        // Validate password requirements
        if (!this.validatePassword(this.password)) {
            alert("Password must contain at least one uppercase letter, one number, and one special character.");
            return;
        }
        // Check if passwords match
        if (this.password !== this.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Send the data to the server using fetch
        fetch('http://localhost:5001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: this.fullname,
                username: this.username,
                email: this.email,
                phone: this.phone,
                password: this.password
            })
        })
            .then(response => response.json())
            .then(data => {
            alert(data.message || 'Registration successful!');
        })
            .catch(error => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
    }
};
exports.RegComponent = RegComponent;
exports.RegComponent = RegComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-reg',
        standalone: true,
        imports: [],
        templateUrl: './reg.component.html',
        styleUrls: ['./reg.component.css']
    })
], RegComponent);
//# sourceMappingURL=reg.component.js.map