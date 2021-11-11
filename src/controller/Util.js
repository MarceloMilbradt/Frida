var formatDate = (date) => {
    return new Date(date?.toDate()).toLocaleString();
}

var formatRelativeDate = (date) => {
    date = date?.toDate();
    const rtf1 = new Intl.RelativeTimeFormat("pt-BR", { style: "narrow" });
    let intervalo = "day";

    const date1 = new Date(date);
    const date2 = new Date();

    let diffTime = Math.ceil(Math.abs(date2 - date1));
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    diffTime /= 1000;
    let diff = diffDays;
    if (diffDays <= 1) {
        if (diffTime < 60) intervalo = "second";
        else if ((diffTime /= 60) < 60) intervalo = "minute";
        else if ((diffTime /= 60) < 24) intervalo = "hour";
        diff = diffTime;
    } else if (diffDays < 7) {
        intervalo = "day";
        diff = diffDays;
    } else if ((diffDays /= 7) < 4) {
        intervalo = "week";
        diff = diffDays;
    } else {
        intervalo = "month";
        diffDays /= 4;
        diff = diffDays;
    }

    if (!diff) return "";
    return rtf1.format(Math.floor(diff * -1), intervalo);
}

export {
    formatDate,
    formatRelativeDate
}