<?php

namespace App\Exceptions;

use Exception;

class CustomException extends Exception
{
    public $persist;
    public $requiresAction;

    /**
     * Constructor
     * 
     * @param string  $message
     * @param boolean $persist
     * @param boolean $requiresAction
     */
    public function __construct($message, $persist = false, $requiresAction = false)
    {
        parent::__construct($message);
        $this->persist = $persist;
        $this->requiresAction = $requiresAction;
    }
}
