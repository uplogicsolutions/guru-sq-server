const OptionsService = require('../services/options.service');

exports.options = async (req, res) => {
    try {
        console.log(req.query);
        const response = await OptionsService.getOptions(req.query);
        res.send({data: response});
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}