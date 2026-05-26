function deltaE(lab1:any, lab2:any) {
  const [L1, a1, b1] = lab1;
  const [L2, a2, b2] = lab2;

  const avgL = (L1 + L2) / 2;

  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const avgC = (C1 + C2) / 2;

  const pow25to7 = 6103515625;

  const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + pow25to7)));

  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;

  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);
  const avgCp = (C1p + C2p) / 2;

  const h1p = (Math.atan2(b1, a1p) * 180 / Math.PI + 360) % 360;
  const h2p = (Math.atan2(b2, a2p) * 180 / Math.PI + 360) % 360;

  let deltahp;
  if (C1p * C2p < 1e-10) {
    deltahp = 0;
  } else if (Math.abs(h1p - h2p) <= 180) {
    deltahp = h2p - h1p;
  } else {
    deltahp = h2p <= h1p ? h2p - h1p + 360 : h2p - h1p - 360;
  }

  const deltaLp = L2 - L1;
  const deltaCp = C2p - C1p;
  const deltaHp = 2 * Math.sqrt(C1p * C2p) *
    Math.sin((deltahp / 2) * Math.PI / 180);

  let avgHp;
  if (C1p * C2p < 1e-10) {
    avgHp = (h1p + h2p) / 2;
  } else if (Math.abs(h1p - h2p) > 180) {
    avgHp = ((h1p + h2p + 360) / 2) % 360;
  } else {
    avgHp = (h1p + h2p) / 2;
  }

  const T =
    1 -
    0.17 * Math.cos((avgHp - 30) * Math.PI / 180) +
    0.24 * Math.cos((2 * avgHp) * Math.PI / 180) +
    0.32 * Math.cos((3 * avgHp + 6) * Math.PI / 180) -
    0.20 * Math.cos((4 * avgHp - 63) * Math.PI / 180);

  const SL = 1 + (0.015 * Math.pow(avgL - 50, 2)) /
    Math.sqrt(20 + Math.pow(avgL - 50, 2));

  const SC = 1 + 0.045 * avgCp;
  const SH = 1 + 0.015 * avgCp * T;

  const deltaTheta = 30 *
    Math.exp(-Math.pow((avgHp - 275) / 25, 2));

  const RC = 2 *
    Math.sqrt(Math.pow(avgCp, 7) /
    (Math.pow(avgCp, 7) + pow25to7));

  const RT = -RC *
    Math.sin(2 * deltaTheta * Math.PI / 180);

  return Math.sqrt(
    Math.pow(deltaLp / SL, 2) +
    Math.pow(deltaCp / SC, 2) +
    Math.pow(deltaHp / SH, 2) +
    RT * (deltaCp / SC) * (deltaHp / SH)
  );
}