function FollowMode () {
    if (Tinybit.Ultrasonic_Car() < 15) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 70)
    } else {
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
}
function BreathLED () {
    Tinybit.RGB_Car_Program().clear()
    for (let k = 0; k <= 255; k++) {
        Tinybit.RGB_Car_Program().setBrightness(k)
        Tinybit.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        Tinybit.RGB_Car_Program().show()
    }
    j = 255
    for (let l = 0; l <= 255; l++) {
        Tinybit.RGB_Car_Program().setBrightness(j)
        j += -1
        Tinybit.RGB_Car_Program().showColor(neopixel.colors(NeoPixelColors.Purple))
        Tinybit.RGB_Car_Program().show()
    }
}
bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . . . .
        # . . . #
        # # # # #
        # . . . #
        . # # # .
        `)
    basic.pause(1000)
    Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
    connected = 1
    while (connected == 1) {
        uartdata = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
        uartdata = uartdata.substr(0, 1)
        CarCtrl()
        domusic()
        SevenColorLED()
        SevenWaterLED()
        ModeSelect()
        distance = Tinybit.Ultrasonic_Car()
        temp = input.temperature()
        str1 = "" + distance + ""
        str1 = "" + str1 + ","
        str2 = "" + temp + ""
        str2 = "" + str2 + "#"
        CSB = "$CSB" + str1 + str2
        bluetooth.uartWriteString(CSB)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # # . # #
        # # . # #
        . . . . .
        . # # # .
        # . . . #
        `)
    connected = 0
    Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
})
function domusic () {
    music.setVolume(127)
    music.setBuiltInSpeakerEnabled(false)
    if (uartdata == "1") {
        music.playTone(262, music.beat(BeatFraction.Half))
    } else if (uartdata == "2") {
        music.playTone(294, music.beat(BeatFraction.Half))
    } else if (uartdata == "3") {
        music.playTone(330, music.beat(BeatFraction.Half))
    } else if (uartdata == "4") {
        music.playTone(349, music.beat(BeatFraction.Half))
    } else if (uartdata == "5") {
        music.playTone(392, music.beat(BeatFraction.Half))
    } else if (uartdata == "6") {
        music.playTone(440, music.beat(BeatFraction.Half))
    } else if (uartdata == "7") {
        music.playTone(494, music.beat(BeatFraction.Half))
    } else if (uartdata == "8") {
        music.playTone(262, music.beat(BeatFraction.Half))
    } else if (uartdata == "B1") {
        music.playTone(277, music.beat(BeatFraction.Half))
    } else if (uartdata == "B2") {
        music.playTone(311, music.beat(BeatFraction.Half))
    } else if (uartdata == "B3") {
        music.playTone(370, music.beat(BeatFraction.Half))
    } else if (uartdata == "B4") {
        music.playTone(415, music.beat(BeatFraction.Half))
    } else if (uartdata == "B5") {
        music.playTone(466, music.beat(BeatFraction.Half))
    } else if (uartdata == "O") {
        music.setVolume(0)
    }
}
function ModeSelect () {
    if (uartdata == "S") {
        g_mode = 1
    } else if (uartdata == "T") {
        g_mode = 2
    } else if (uartdata == "U") {
        g_mode = 3
    } else if (uartdata == "V") {
        g_mode = 0
        basic.showLeds(`
            . . . . .
            # . . . #
            # # # # #
            # . . . #
            . # # # .
            `)
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    }
}
function AvoidMode () {
    if (Tinybit.Ultrasonic_Car() < 15) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 90)
        basic.pause(400)
    } else {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 100)
    }
}
function HorseLED () {
    Tinybit.RGB_Car_Program().setBrightness(255)
    Tinybit.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Blue))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
}
function TrackingMode () {
    if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 80)
    } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.White) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 70)
    } else if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black) && Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.White)) {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 70)
    } else {
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Stop, 0)
    }
}
function WaterLED () {
    Tinybit.RGB_Car_Program().setBrightness(255)
    Tinybit.RGB_Car_Program().setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().setPixelColor(2, neopixel.colors(NeoPixelColors.Green))
    Tinybit.RGB_Car_Program().show()
    basic.pause(100)
    Tinybit.RGB_Car_Program().clear()
    Tinybit.RGB_Car_Program().show()
}
function SevenColorLED () {
    if (uartdata == "A") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
    } else if (uartdata == "B") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Green)
    } else if (uartdata == "C") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Blue)
    } else if (uartdata == "D") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Yellow)
    } else if (uartdata == "E") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Cyan)
    } else if (uartdata == "F") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.Pinkish)
    } else if (uartdata == "0") {
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
    }
}
function CarCtrl () {
    if (uartdata == "A") {
        dL += dLinc
        dR += dRinc
        basic.showString("A")
    } else if (uartdata == "B") {
        dL += dLinc * -1
        dR += dRinc * -1
        basic.showString("B")
    } else if (uartdata == "C") {
        if (dR >= 0) {
            dR += dRincSpin
        } else {
            dR += dRincSpin * -1
        }
    } else if (uartdata == "D") {
        if (dL >= 0) {
            dL += dLincSpin
        } else {
            dL += dLincSpin * -1
        }
        basic.showString("C")
        basic.showString("D")
    } else if (uartdata == "E") {
        if (dR >= 0) {
            dR += dRincSpin
            dL += dLincSpin * -1
        } else {
            dR += dRincSpin * -1
            dL += dLincSpin
        }
        basic.showString("E")
    } else if (uartdata == "F") {
        if (dL >= 0) {
            dL += dLincSpin
            dR += dRincSpin * -1
        } else {
            dL += dLincSpin * -1
            dR += dRincSpin
        }
        basic.showString("F")
    } else if (uartdata == "0") {
        if (Math.abs(dL) < dLoff) {
            dL = 0
        } else {
            if (dL >= dLoff) {
                dL += dLoff * -1
            } else {
                if (dL <= dLoff * -1) {
                    dL += dLoff
                }
            }
        }
        if (Math.abs(dR) < dRoff) {
            dR = 0
        } else {
            if (dR >= dRoff) {
                dR += dRoff * -1
            } else {
                if (dR <= dRoff * -1) {
                    dR += dRoff
                }
            }
        }
        basic.showString("0")
    }
}
function SevenWaterLED () {
    if (uartdata == "N") {
        g_RGBMode = 1
    } else if (uartdata == "P") {
        g_RGBMode = 2
    } else if (uartdata == "Q") {
        g_RGBMode = 3
    } else if (uartdata == "R") {
        g_RGBMode = 4
    } else if (uartdata == "W") {
        g_RGBMode = 5
    }
}
let CSB = ""
let str2 = ""
let str1 = ""
let temp = 0
let distance = 0
let uartdata = ""
let j = 0
let dRincSpin = 0
let dLincSpin = 0
let dRinc = 0
let dLinc = 0
let dRoff = 0
let dLoff = 0
let dR = 0
let dL = 0
let g_mode = 0
let g_RGBMode = 0
let connected = 0
let item = ""
let i = 0
Tinybit.RGB_Car_Big(Tinybit.enColor.Red)
bluetooth.startUartService()
basic.showLeds(`
    . # # # .
    # . . . .
    . # # . .
    . . . # .
    # # # . .
    `)
connected = 0
g_RGBMode = 0
g_mode = 0
dL = 0
dR = 0
dLoff = 0
dRoff = 0
dLinc = 10
dRinc = 10
dLincSpin = 10
dRincSpin = 10
basic.forever(function () {
    Tinybit.CarCtrlSpeed2(Tinybit.CarState.Car_Run, dL, dR)
})
