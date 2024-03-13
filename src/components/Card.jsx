import "./card.css";
import image2 from "./img/image2.png";
import image3 from "./img/image3.png";
import image4 from "./img/image4.png";
import image5 from "./img/image5.png";
import { useEffect, useState } from "react";
import axios from "axios";
import data from "./data";
import {cityNames} from "./data"
import moment from "moment";

export default function Card() {
    let [timings, setTimings] = useState({});
    let [govern, setGovern] = useState("Cairo");
    let [city, setCity] = useState("EG");
    let [loader, setLoader] = useState(false);
    let [nextPrayerIndex, setNextPrayerIndex] = useState(1);
    const prayersArray = [
		{ key: "Fajr", displayName: "الفجر" },
		{ key: "Dhuhr", displayName: "الظهر" },
		{ key: "Asr", displayName: "العصر" },
		{ key: "Sunset", displayName: "المغرب" },
		{ key: "Isha", displayName: "العشاء" },
	];
    const [remainingTime, setRemainingTime] = useState("");
    useEffect(() => {
        setLoader(true);
        async function getData() {
            let response = await axios.get(
                `https://api.aladhan.com/v1/timingsByCity/12-03-2024?city=${city}&country=${govern}&method=8`
            );
            let data = response.data.data.timings;
            setTimings(data);
            setLoader(false);
        }
        getData();
    }, [city, govern]);

    useEffect(() => {
        let interval = setInterval(() => {
            setupCountdownTimer();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [timings]);

    const setupCountdownTimer = () => {
        const momentNow = moment();
        let prayerIndex = 2;
        if (
            momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
        ) {
            prayerIndex = 1;
        } else if (
            momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
        ) {
            prayerIndex = 2;
        } else if (
            momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
        ) {
            prayerIndex = 3;
        } else if (
            momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
        ) {
            prayerIndex = 4;
        } else {
            prayerIndex = 0;
        }
        setNextPrayerIndex(prayerIndex);

        const nextPrayerObject = prayersArray[prayerIndex];
        const nextPrayerTime = timings[nextPrayerObject.key];
        const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");
        let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
        if (remainingTime < 0) {
            const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
            const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
                moment("00:00:00", "hh:mm:ss")
            );
            const totalDiffernce = midnightDiff + fajrToMidnightDiff;
            remainingTime = totalDiffernce;
        }
        const durationRemainingTime = moment.duration(remainingTime);
        setRemainingTime(`${durationRemainingTime.hours()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()}`);
    };
    function handleHours(time){
        if(Number(String(time).substring(0, 2))>=12){
            let first = +String(time).substring(0, 2) - 12
            let second = +String(timings.Asr).substring(3)
            return `${first} : ${second} PM`
        }else{
            return `${time} AM`
        }
    }
    return (
        <>
            <div className="card_content">
                <div className="card_content_logo">
                    <img src={image3} alt="logo" style={{ width: "100px" }} />
                    <img src={image4} alt="star" style={{width: "20px",position: "absolute",left: "78px",top: "15px",}}/>
                    <img src={image4} alt="star" style={{width: "20px",position: "absolute",left: "103px",top: "11px",}}/>
                    <img src={image4} alt="star" style={{width: "20px",position: "absolute",left: "106px",top: "36px",}}/>
                    <img src={image5} alt="star" style={{width: "20px",position: "absolute",left: "123px",top: "84px",}}/>
                </div>
                <div className="card_content_remaining">
                    <h2>
                        متبقي علي صلاة <span>{prayersArray[nextPrayerIndex].displayName}</span>
                    </h2>
                    <p>{remainingTime}</p>
                    <select
                        className="card_content_remaining_select"
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                        style={{ transform: "translate(5%, -50%)" }}
                    >
                        <option value="EG">Choose Country</option>
                        {Object.keys(data).map((city, i) => (
                            <option key={i} value={city}>
                                {cityNames[i]}
                            </option>
                        ))}
                    </select>
                    <select
                        className="card_content_remaining_select country"
                        onChange={(e) => setGovern(e.target.value)}
                        style={{ transform: "translate(-105%, -50%)" }}
                    >
                        <option value="cairo">Choose Governorate</option>
                        {data[`${city}`].map((govern, i) => (
                            <option key={i} value={govern}>
                                {govern}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="card_content_adahn">
                    <p className="adahn_name">{prayersArray[0].displayName}</p>
                    <div className="card_content_adahn_card" trr={prayersArray[0].displayName}>
                        <h2>{handleHours(timings.Fajr)}</h2>
                    </div>
                    <p className="adahn_name">{prayersArray[1].displayName}</p>
                    <div className="card_content_adahn_card" trr={prayersArray[1].displayName}>
                        <h2>{handleHours(timings.Dhuhr)}</h2>
                    </div>
                    <p className="adahn_name">{prayersArray[2].displayName}</p>
                    <div className="card_content_adahn_card" trr={prayersArray[2].displayName}>
                        <h2>{handleHours(timings.Asr)}</h2>
                    </div>
                    <p className="adahn_name">{prayersArray[3].displayName}</p>
                    <div className="card_content_adahn_card" trr={prayersArray[3].displayName}>
                        <h2>{handleHours(timings.Maghrib)}</h2>
                    </div>
                    <p className="adahn_name">{prayersArray[4].displayName}</p>
                    <div className="card_content_adahn_card" trr={prayersArray[4].displayName}>
                        <h2>{handleHours(timings.Isha)}</h2>
                    </div>
                </div>
                <div className={loader ? "activeLoader" : "hideLoader"}>
                    <div className="loader"></div>
                </div>
            </div>
            <img src={image2} alt="img" className="card-img" />
            <p className="card-footer">
                Created by <b>Ahmed Naser El-Hanafy</b>
            </p>
        </>
    );
}