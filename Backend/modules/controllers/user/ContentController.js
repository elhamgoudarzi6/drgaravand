import Controller from '../Controller.js';

export default new class ContentController extends Controller {

    async addContactMessage(req, res) {
        try {
            const doc = await this.model.ContactMessage({
                fullName: req.body.fullName,
                email: req.body.email,
                mobile: req.body.mobile,
                title: req.body.title,
                message: req.body.message
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: err, success: false });
        }
    }

    async getFaqs(req, res) {
        try {
            const result = await this.model.Faq.find({});
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            });
        } catch (err) {
            console.log(err.message);
        }

    }

    async addReserve(req, res) {
        try {
            const doc = await this.model.Reserve({
                userID: req.body.userID,
                date: req.body.date,
                time: req.body.time,
                reason: req.body.reason,
                docType: req.body.docType,
                consultationType: req.body.consultationType,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: err, success: false });
        }
    }

    async getGallery(req, res) {
        try {
            const result = await this.model.Gallery.find();
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            });
        } catch (err) {
            res.json({ data: err, success: false });
        }
    }


}
