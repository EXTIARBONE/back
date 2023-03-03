import schedule from 'node-schedule'
import {UserService} from "../services/user.service";
import {scoreCarboneHistoricProps} from "../models/historicCarbonScore";

export const monthlyTask = (): void => {
    const task = schedule.scheduleJob(process.env.CRON_DELAY as string, async function () {
        console.log('debut de la routine')
        // Instruction à lancer tous les premiers jours du mois
        let users = await UserService.getInstance().getAll();
        const date = new Date();
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthAndYear = new Date(year, month);
        try {
            for(let i = 0; i < users.length; i++){
                let tmpUser = users[i];
                let tmpHisto : scoreCarboneHistoricProps = {
                    score: tmpUser.carbonScore,
                    date: monthAndYear
                }
                tmpUser.historicCarbonScore.push(tmpHisto);
                tmpUser.carbonScore = 0;
                tmpUser.save();
                console.log("fin de la routine")
            }
        }
        catch (e){
            console.error(e)
        }

    });
}
