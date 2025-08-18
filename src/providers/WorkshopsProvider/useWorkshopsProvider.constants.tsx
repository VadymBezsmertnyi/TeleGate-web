import { useLocalesProvider } from "@/localization/localization.provider";
import { TypeWorksType } from "./WorkshopsProvider.types";

export const useWorkshopsProviderState = () => {
  const { i18n } = useLocalesProvider();
  const typesWorkServices: { auto: TypeWorksType; moto: TypeWorksType } = {
    auto: [
      {
        id: 1,
        title: i18n._("Maintenance"),
        description: i18n._(
          "Oil change / Filter replacement / Timing belt replacement / Spark plug replacement / Transmission oil change / Brake service / Replacement of all necessary fluids / Etc."
        ),
      },
      {
        id: 2,
        title: i18n._("Diagnostics"),
        description: i18n._(
          "Pre-purchase comprehensive diagnostics / Chassis diagnostics / Engine diagnostics / Transmission diagnostics / Body diagnostics / Computer diagnostics / Fluid diagnostics / Etc."
        ),
      },
      {
        id: 3,
        title: i18n._("Auto Electrical"),
        description: i18n._(
          "Wiring repair / Chip tuning / Installation of any complexity alarm / Odometer correction / Key reprogramming / Engine and transmission adaptation / EGR removal / DPF removal / Xenon installation / Parking sensors installation / Etc."
        ),
      },
      {
        id: 4,
        title: i18n._("Chassis Repair"),
        description: i18n._(
          "Shock absorber strut replacement / Spring replacement / Control arm replacement / Beam replacement / Silent block pressing / Leaf spring replacement / Hub replacement / Saw blade replacement / Axle replacement / Ball joint replacement / Engine and transmission mount replacement / Mechanical work"
        ),
      },
      {
        id: 5,
        title: i18n._("Engine, Automatic, and Manual Transmission"),
        description: i18n._(
          "Engine diagnostics / Engine repair / Engine replacement / Engine oil pan replacement / Automatic transmission diagnostics / Automatic transmission oil change / Automatic transmission replacement / Automatic transmission cleaning-flushing / Clutch replacement / Manual transmission diagnostics / Manual transmission oil change / Manual transmission replacement / Manual transmission cleaning-flushing / Etc."
        ),
      },
      {
        id: 6,
        title: i18n._("Brakes and Steering System"),
        description: i18n._(
          "Brake system diagnostics / Brake fluid replacement / Brake system repair / Brake bleeding / Steering rack replacement / Steering rack restoration / Power steering replacement / Power steering fluid replacement / Etc."
        ),
      },
      {
        id: 7,
        title: i18n._("Accessory Equipment"),
        description: i18n._(
          "Starter repair / Starter replacement / Generator repair / Generator replacement / Turbocharger restoration / Turbocharger replacement / Etc."
        ),
      },
      {
        id: 8,
        title: i18n._("Air Conditioning Systems"),
        description: i18n._(
          "Diagnostics / Charging / Recharging / Leak detection / Pipe replacement / Radiator replacement / Compressor repair / Compressor replacement / System disinfection / Elimination of foreign odors"
        ),
      },
      {
        id: 9,
        title: i18n._("Wheel Alignment"),
        description: i18n._(
          "Wheel alignment / Alignment diagnostics / Suspension defect search / Body defect search"
        ),
      },
    ],
    moto: [
      {
        id: 1,
        title: i18n._("Technical maintenance"),
        description: i18n._(
          "Cable lubrication / Carburetor synchronization / Air filter replacement / Spark plug replacement / Transmission oil change / Differential oil change / Coolant replacement / Engine oil change"
        ),
      },
      {
        id: 2,
        title: i18n._("General works"),
        description: i18n._(
          "General diagnostics / Compression measurement / Technical fluid level check / Clutch cable replacement / Throttle cable replacement / Fuel tank cleaning and flushing / Fuel tank removal and installation / Plastic removal and installation / Safety arch, slider installation"
        ),
      },
      {
        id: 3,
        title: i18n._("Chassis"),
        description: i18n._(
          "Front wheel removal and installation / Rear wheel removal and installation / Wheel bearing replacement / Steering column bearing adjustment / Steering column bearing replacement / Front fork removal and installation / Front fork seal replacement / Front fork oil change / Rear swingarm bearing replacement / Rear shock absorber replacement / Monoshock absorber replacement / Rear shock absorber repair"
        ),
      },
      {
        id: 4,
        title: i18n._("Drive chain"),
        description: i18n._(
          "Drive chain and sprocket replacement / Chain cleaning, lubrication, and adjustment / Chain adjustment, tensioning, and lubrication"
        ),
      },
      {
        id: 5,
        title: i18n._("Engine"),
        description: i18n._(
          "Removal and installation / Valve adjustment / Clutch replacement / Cylinder head repair / Timing chain replacement / Piston group repair / Gearbox repair / Engine overhaul"
        ),
      },
      {
        id: 6,
        title: i18n._("Electrics"),
        description: i18n._(
          "Regulator relay replacement / Alternator replacement / Starter replacement / Starter repair / Bulb replacement / Xenon installation / Battery replacement / Battery charging"
        ),
      },
      {
        id: 7,
        title: i18n._("Brake system"),
        description: i18n._(
          "Disk brake pad replacement / Drum brake pad replacement / Brake bleeding / Brake fluid replacement / Combined brake fluid replacement / Brake hose replacement / Reinforced hose installation / Brake disk replacement / Brake caliper repair"
        ),
      },
      {
        id: 8,
        title: i18n._("Plastic repair"),
        description: i18n._(
          "Welding/restoration of fragments/restoration of fasteners"
        ),
      },
      {
        id: 9,
        title: i18n._("Welding works"),
        description: i18n._(
          "Electric arc welding / Semi-automatic welding / Argon arc welding"
        ),
      },
      {
        id: 10,
        title: i18n._("Tuning and customization"),
        description: i18n._(
          "Protective arch installation / Slider installation / Exhaust system installation / Brake system installation / Reinforced hose installation / Xenon installation / Motorcycle lighting installation / Fog light installation (FL)"
        ),
      },
    ],
  };
  return { typesWorkServices };
};
