const { joinModel } = require("../schema/join")

class joinTools {

    /**
     * 
     * @param {纳新信息} data 
     */
    async joinUs(data) {

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

        console.log(sId);

    }


}

module.exports = new joinTools()