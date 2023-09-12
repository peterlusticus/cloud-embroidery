import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal, faStickerMule, faUbuntu, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faBuildingColumns, faCircleNotch, faCreditCard, faDesktop, faLaptop, faMoneyBill, faServer } from "@fortawesome/free-solid-svg-icons"

export const suffix = "| Cloud Embroidery"

export const bookingSteps = [
  { id: '1', name: 'Farben wählen', href: '#' },
  { id: '2', name: 'Rahmen wählen', href: '#' },
  { id: '3', name: 'Stickcode platzieren', href: '#' },
  { id: '4', name: 'Besticken', href: '#' },
]

export const frames = [
  { id: '1', title: "Groß", specifications: ["Für große Sticke", "20cm x 30cm", "Oval"], icon: faCircleNotch },
  { id: '2', title: "Mittel", specifications: ["Für mittelgroße Sticke", "15cm x 20cm", "Oval"], icon: faCircleNotch },
  { id: '3', title: "Klein", specifications: ["Für kleine Sticke", "10cm x 10cm", "Rund"], icon: faCircleNotch },
]
export const coloredOptions = [{ id: "0", title: "Einfarbig", value: false }, { id: "1", title: "Mehrfarbig", value: true }];
export const colors = ["Grün","Rot","Braun","Violett","Blau","Gelb","Weiß","Schwarz","Custom1","Custom2","Custom3","Custom4"]
export const needles = ["1","2","3","4","5","6"]

export const standard = [
  { id: '1', name: '1 GB LAN oder WLAN 6.0 kompatibel', href: 'https://www.dslweb.de/wifi-6.php' },
  { id: '2', name: 'Fujitsu Bildschirm', href: 'https://sp.ts.fujitsu.com/dmsp/Publications/public/ds-display-b24-8-ts-pro-de.pdf' },
  { id: '3', name: 'Fujitsu Maus', href: 'https://www.fujitsu.com/de/products/computing/peripheral/accessories/input-devices/mice/mouse-m520-black.html' },
  { id: '4', name: 'Fujitsu Tastatur', href: 'https://www.fujitsu.com/de/products/computing/peripheral/accessories/input-devices/keyboards/keyboard-kb521.html' },
]

export const betriebssysteme = [
  { id: '1', title: "Windows 11", description: "Version 22H2", icon: faWindows },
  { id: '2', title: "Windows 10", description: "Version 22H2", icon: faWindows },
  { id: '3', title: "Ubuntu", description: "Version 22.10 (Kinetic Kudu)", icon: faUbuntu }
]

export const browser = [
  "Google Chrome (Version 110.0.5481.181)",
  "Mozilla Firefox (Version 110.0)",
  "Microsoft Edge (Version 110.0.1587.50)"
]

export const kommunikationsapplikationen = [
  "Microsoft Teams (Version 1.6.00.1159)",
  "Discord Messenger (Version 1.0.9011)",
  "Slack Messenger (Version 4.29.149)"
]

export const paymentMethods = [
  { id: '1', title: "PayPal", description: "Online-Bezahldienst", icon: faPaypal },
  { id: '2', title: "Barzahlung", description: "Barzahlung vor Ort", icon: faMoneyBill },
  { id: '3', title: "Überweisung", description: "Vorkasse per Überweisung", }
]

export const bookingTimes = getTimeInSteps(new Date("1970-01-01T06:45:00.00"), new Date("1970-01-01T20:00:00.00"), 15)

function getTimeInSteps(startTime: Date, endTime: Date, steps: number) {

  let finalTime = startTime;
  let times: string[] = [];
  let timeDiff: number = (endTime.getHours() - startTime.getHours()) * 60 + (endTime.getMinutes() - startTime.getMinutes());

  for (let i = 0; i < (timeDiff / steps); i++) {
    finalTime = new Date(finalTime.getTime() + (steps * 60 * 1000));
    times.push(finalTime.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }) + " Uhr");
  }

  return times;
}