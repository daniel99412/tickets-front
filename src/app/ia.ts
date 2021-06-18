/**
 * TODO?: with the model of Diffuse Logic return the best user for attender ticket
 * @param average average of all tickets with the requested subcategory when creating a ticket
 * @param noTickets total tickets of users who attend tickets, do not count completed or canceled tickets
 */
export function diffuseLogic(average: number, noTickets: number): number{

    let total = 0;
    let percentageTickets = 0;
    let averagePercentage = 0;

    if (! average || !noTickets) { // No have register
        return 404;
    }

    if(average > 0 && average == 2){
      percentageTickets = .01
    }
    else if(average > 2 && average == 4){
      percentageTickets = .25
    }
    else if(average > 4 && average == 5){
      percentageTickets = .50
    }

    if(noTickets > 0 && noTickets == 25){
      percentageTickets = .50
    }
    else if(noTickets > 26 && noTickets == 50){
      percentageTickets = .25
    }
    else if(noTickets > 50){
      percentageTickets = .01
    }

    total = percentageTickets + averagePercentage;

    return total
}
