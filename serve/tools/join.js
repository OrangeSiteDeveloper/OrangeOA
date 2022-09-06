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
                {sId},{
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
            if(relt.acknowledged === true) return "success";
            else return "failed";

        } catch (error) {
            console.log(error);
            return "failed";
        }


    }


}

module.exports = new joinTools()