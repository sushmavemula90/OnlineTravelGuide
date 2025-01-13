"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const home_component_1 = require("./home/home.component");
const accomodation_component_1 = require("./accomodation/accomodation.component");
const gallery_component_1 = require("./gallery/gallery.component");
const feedback_component_1 = require("./feedback/feedback.component");
const agent_reg_component_1 = require("./agent-reg/agent-reg.component");
const admin_component_1 = require("./admin/admin.component");
const login_component_1 = require("./login/login.component");
const reg_component_1 = require("./reg/reg.component");
let AppComponent = class AppComponent {
    title = 'proj';
};
exports.AppComponent = AppComponent;
exports.AppComponent = AppComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'app-root',
        standalone: true,
        imports: [router_1.RouterOutlet, router_1.RouterLink, home_component_1.HomeComponent, accomodation_component_1.AccomodationComponent, gallery_component_1.GalleryComponent, feedback_component_1.FeedbackComponent, agent_reg_component_1.AgentRegComponent, admin_component_1.AdminComponent, login_component_1.LoginComponent, reg_component_1.RegComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.css'
    })
], AppComponent);
//# sourceMappingURL=app.component.js.map