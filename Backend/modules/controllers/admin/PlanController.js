
import Controller from '../Controller.js';

export default new class PlanController extends Controller {

    async addPlan(req, res) {
        try {
            const doc = await this.model.Plan({
                times: req.body.times,
                date: req.body.date,
            });
            await doc.save();
            return res.json({ data: 'ثبت شد', success: true });
        }
        catch (err) {
            res.json({ data: 'err', success: false });
        }
    }


    async getPlans(req, res) {
        try {
            const result = await this.model.Plan.find();
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

    async editPlan(req, res) {
        try {
            let listFields = {};
            if (req.body.times) { listFields.times = req.body.times }
            if (req.body.date) { listFields.date = req.body.date }
            const result = await this.model.Plan.findByIdAndUpdate(req.params.id, listFields);
            if (result) {
                return res.json({
                    data: 'ویرایش شد',
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

    async deletePlan(req, res) {
        try {
            const result = await this.model.Plan.findByIdAndDelete(req.params.id);
            if (result) {
                return res.json({
                    data: 'حذف شد',
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

}


