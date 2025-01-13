"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const accomodation_component_1 = require("./accomodation/accomodation.component");
const home_component_1 = require("./home/home.component");
const gallery_component_1 = require("./gallery/gallery.component");
const feedback_component_1 = require("./feedback/feedback.component");
const agent_reg_component_1 = require("./agent-reg/agent-reg.component");
const admin_component_1 = require("./admin/admin.component");
const login_component_1 = require("./login/login.component");
const reg_component_1 = require("./reg/reg.component");
exports.routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'accomodation', component: accomodation_component_1.AccomodationComponent },
    { path: 'gallery', component: gallery_component_1.GalleryComponent },
    { path: 'feedback', component: feedback_component_1.FeedbackComponent },
    { path: 'agent-reg', component: agent_reg_component_1.AgentRegComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'reg', component: reg_component_1.RegComponent }
];
//# sourceMappingURL=app.routes.js.map