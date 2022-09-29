const { joinModel } = require("../schema/join")

class joinTools {

    /**
     * 
     * @param {纳新信息} data 
     */
    async joinUs(data) {

        try {
            const {
                sId,
                sName,
                sex,
                sMajor,
                sPhone,
                sQQ,
                sEmail,
                sGroup,
                sDepartment,
                w3review,
            } = data;

            const relt = await joinModel.updateOne(
                { sId }, {
                sId,
                sName,
                sex,
                sMajor,
                sPhone,
                sQQ,
                sEmail,
                sGroup,
                sDepartment,
                w3review,
            }, {
                upsert: true
            })
            if (relt.acknowledged === true) return "success";
            else { console.log(data); return "failed"; }

        } catch (error) {
            console.log(error);
            return "failed";
        }


    }

    async joinStatus(sId) {

        try {

            return await joinModel.findOne({ sId });

        } catch (error) {
            console.log(error);
            return "failed";
        }

    }

    async getAllStu() {

        try {

            return await joinModel.find();
            
        } catch (error) {
            console.log(error);
            return "failed";
        }


    }

    async changeStatus() {

        try {

            return await joinModel.updateMany({}, {status: "2.1"})
            
        } catch (error) {
            
        }
    }


}

module.exports = new joinTools()