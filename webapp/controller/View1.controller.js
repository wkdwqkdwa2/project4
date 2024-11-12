sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/Popover",
    "sap/ui/core/library",
    'sap/ui/model/json/JSONModel',
	"sap/ui/core/date/UI5Date"
], function (Controller, Popover, CoreLibrary, JSONModel, UI5Date) {
    "use strict";

    return Controller.extend("project4.controller.View1", {
        onInit: function () {
            var oModel = new JSONModel();
            // `VizFrame`과 `Popover` 가져오기
            var oVizFrame = this.byId("idVizFrame");
            var oPopover = this.byId("idPopOver");
            // DRS는 DATESelect를 받고 처리하기 위한 데이터 선언입니다.
            var oDRS = this.byId("DRS"),
                dateFrom = UI5Date.getInstance(),
                dateTo = UI5Date.getInstance();
            // //초기  DATE 값 설정
            oModel.setData({
				start: dateFrom,
				end: dateTo,

				oDRSStart: UI5Date.getInstance(2016, 1, 16),
				oDRSEnd: UI5Date.getInstance(2016, 1, 18),
            });
            this.getView().setModel(oModel);
            // `Popover`를 `VizFrame`에 연결
            oPopover.connect(oVizFrame.getVizUid());
            
            // `Popover`의 추가 설정 (선택사항)
            // oPopover.setFormatString(sap.viz.ui5.format.ChartFormatter.DefaultPattern.STANDARDFLOAT);
        },

        // 필요 시 selectionChange 이벤트 핸들러 설정
        onSelectionChange: function (oEvent) {
            var oPopover = this.getView().byId("idPopOver");
            if (oPopover) {
                oPopover.connect(oVizFrame.getVizUid());
            }
        },		
        handleChange: function (oEvent) {
            // 시작일
			var sFrom = oEvent.getParameter("from"),
            // 마지막일
				sTo = oEvent.getParameter("to"),
				bValid = oEvent.getParameter("valid"),
				oEventSource = oEvent.getSource(),
				oText = this.byId("TextEvent");

			this._iEvent++;

			// oText.setText("Id: " + oEventSource.getId() + "\nFrom: " + sFrom + "\nTo: " + sTo);
            console.log(sFrom, sTo);
			if (bValid) {
				oEventSource.setValueState(ValueState.None);
			} else {
				oEventSource.setValueState(ValueState.Error);
			}
		}
    });
});
