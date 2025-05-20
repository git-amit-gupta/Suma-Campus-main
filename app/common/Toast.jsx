import "./common.css";

export function ToastGreen(text = "Form validation Success.") {
  return Ext.toast({
    html: `<div style="display: flex; align-items: center;">
                <span class="x-fa fa-exclamation-circle" style="margin-right: 10px; color: white;"></span>
                <span>${text}</span>
             </div>`,
    align: "t",
    slideDuration: 1000,
    width: 350,
    autoSize: true,
    bodyCls: "bg-toastgreen",
  });
}

export function ToastRed(
  text = "Form validation failed.",
  reason = "Please check the required fields."
) {
  return Ext.toast({
    html: `<div style="display: flex; align-items: center;">
                    <span class="x-fa fa-exclamation-circle" style="margin-right: 10px; color: white;"></span>
                    <span>${text}<br/>${reason}</span>
                 </div>`,
    align: "t",
    slideDuration: 500,
    width: 350,
    autoSize: true,
    bodyCls: "bg-toastred",
  });
}
