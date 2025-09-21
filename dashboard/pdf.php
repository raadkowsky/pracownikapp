<?php


$date_stamp = date("Y-m-d h-i-s");

header("Content-type:application/pdf");
// It will be called downloaded.pdf
header("Content-Disposition:attachment;filename=\"enea.my_pasek_wynagrodzenia_wygenerowano_$date_stamp.pdf\"");


echo file_get_contents('przykladowy_pasek.pdf');


?>