import User from '../models/user.js';
import Admin from '../models/admin.js';
import Faq from '../models/faq.js';
import ContactMessage from '../models/contactMessage.js';
import Gallery from '../models/gallery.js';
import Order from '../models/order.js';
import Plan from '../models/plan.js';
import Reserve from '../models/reserve.js';

export default class Controller {
    constructor() {
        this.model = { User, Admin, Faq, ContactMessage, Gallery, Order, Plan, Reserve }
    }

    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.json({
                message: errors,
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
