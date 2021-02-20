const OptionsService = require('../services/options.service');

exports.options = async (req, res) => {
    try {
        console.log(req.body);
        const response = await OptionsService.getOptions(req.body);
        res.send({data: response});
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}