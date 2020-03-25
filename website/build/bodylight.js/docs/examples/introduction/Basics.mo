model Basics
  parameter Real sinus_amplitude = 1;
  parameter Real cosinus_amplitude = 1;
  
  parameter Real sinus_shift = 00;
  parameter Real cosinus_shift = 0;  
  
  parameter Real sinus_frequency = 1;
  parameter Real cosinus_frequency = 1;
  Real sinus;
  Real cosinus;
  
equation
  sinus = Modelica.Math.sin(
    (time + sinus_shift) * sinus_frequency
  ) * sinus_amplitude;
  
  cosinus = Modelica.Math.cos(
    (time + cosinus_shift) * cosinus_frequency
  ) * cosinus_amplitude;

end Basics; 
