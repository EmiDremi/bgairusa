<?php

require_once("PHP-iSDK/isdk.php5");

/////////////////////////////

function logger($info) {
  $logfile = fopen("/kunden/homepages/36/d88793893/htdocs/bgairusa/signup_log.txt", "a");
  $time = date("Y-m-d H:i:s");
  fwrite($logfile, $time . " ");
  fwrite($logfile, $info . "\n");
  fclose($logfile);
}

////////////////////////////

if (isset($_POST['inf_field_Name'],$_POST['inf_field_Email'])):

  $email = trim($_POST['inf_field_Email']);
  $name = trim($_POST['inf_field_Name']);
  $clean_name = filter_var($name, FILTER_SANITIZE_STRING); 

  $name_parts = explode(' ', $clean_name);
  $name_parts_size = count($name_parts);
  if ($name_parts_size == 1):
    $firstname = array_pop($name_parts);
    $lastname = "";
  else:
    $lastname = array_pop($name_parts); 
    $firstname = implode(" ", $name_parts);
  endif;
  
  $firstname = ucfirst($firstname);
  $lastname = ucfirst($lastname); 
  logger ("Received request - First Name: {$firstname}, Last Name: {$lastname}, Email: {$email}");

  try {
  $app = new iSDK;

  //API logging to file apilog.csv in PHP-iSDK directory
  //$app->enableLogging(1);

  if ($app->cfgCon("bulgariaairusa")):

    //check for existing contact;
    $returnFields = array('Id');
    $dups = $app->findByEmail($email, $returnFields);

    if (!empty($dups)):

      logger ("Contact already exists. Just opt them in."); 
      $app->optIn($email, "Web form signup");
      print 'THANK YOU FOR SIGNING UP!';

    else:

      // add new contact and opt them in
      $contact = array('Email' => $email, 'FirstName' => $firstname, 'LastName' => $lastname);
      $new_contact = $app->addCon($contact, "Web form signup");
      logger ("New contact added. Contact id: {$new_contact}");
      print 'THANK YOU FOR SIGNING UP!';

    endif;

  else:
    logger ("Error connecting.");   
    print 'ERROR SIGNING UP. TRY AGAIN LATER.';
  endif;  // connection check

  } catch (Exception $e) {
    logger ($e->__toString());
    print 'ERROR SIGNING UP. TRY AGAIN LATER.';
  }

endif; 

?>
