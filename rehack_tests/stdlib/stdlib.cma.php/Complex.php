<?hh
// Copyright 2004-present Facebook. All Rights Reserved.

/**
 * Complex.php
 */

namespace Rehack;

final class Complex {
  <<__Memoize>>
  public static function get() {
    $global_object = \Rehack\GlobalObject::get();
    $runtime = \Rehack\Runtime::get();
    /*
     * Soon, these will replace the `global_data->ModuleName`
     * pattern in the load() function.
     */
    $Pervasives = Pervasives::get();
    Complex::load($global_object);
    $memoized = $runtime->caml_get_global_data()->Complex;
    return $memoized;
  }

  /**
   * Performs module load operation. May have side effects.
   */
  private static function load($joo_global_object) {
    

    $runtime = $joo_global_object->jsoo_runtime;$Math = $runtime->Math;
    $zero = R(254, 0, 0);
    $one = R(254, 1, 0);
    $i = R(254, 0, 1);
    $Cm = R(254, 0, 0);
    $add = function($x, $y) {return V(254, $x[1] + $y[1], $x[2] + $y[2]);};
    $sub = function($x, $y) {return V(254, $x[1] - $y[1], $x[2] - $y[2]);};
    $neg = function($x) {return V(254, - $x[1], - $x[2]);};
    $conj = function($x) {return V(254, $x[1], - $x[2]);};
    $mul = function($x, $y) {
      return V(
        254,
        $x[1] *
          $y[1] -
          $x[2] *
            $y[2],
        $x[1] *
          $y[2] +
          $x[2] *
            $y[1]
      );
    };
    $div = function($x, $y) use ($Math) {
      if ($Math->abs($y[2]) <= $Math->abs($y[1])) {
        $r = $y[2] / $y[1];
        $d = $y[1] + $r * $y[2];
        return V(254, ($x[1] + $r * $x[2]) / $d, ($x[2] - $r * $x[1]) / $d);
      }
      $r__0 = $y[1] / $y[2];
      $d__0 = $y[2] + $r__0 * $y[1];
      return V(
        254,
        ($r__0 * $x[1] + $x[2]) / $d__0,
        ($r__0 * $x[2] - $x[1]) / $d__0
      );
    };
    $inv = function($x) use ($div,$one) {return $div($one, $x);};
    $norm2 = function($x) {return $x[1] * $x[1] + $x[2] * $x[2];};
    $norm = function($x) use ($Math) {
      $r = $Math->abs($x[1]);
      $i = $Math->abs($x[2]);
      if ($r == 0) {return $i;}
      if ($i == 0) {return $r;}
      if ($i <= $r) {$q = $i / $r;return $r * $Math->sqrt(1 + $q * $q);}
      $q__0 = $r / $i;
      return $i * $Math->sqrt(1 + $q__0 * $q__0);
    };
    $arg = function($x) use ($Math) {return $Math->atan2($x[2], $x[1]);};
    $polar = function($n, $a) use ($Math) {
      return V(254, $Math->cos($a) * $n, $Math->sin($a) * $n);
    };
    $sqrt = function($x) use ($Cm,$Math) {
      if ($x[1] == 0) {if ($x[2] == 0) {return $Cm;}}
      $r = $Math->abs($x[1]);
      $i = $Math->abs($x[2]);
      if ($i <= $r) {
        $q = $i / $r;
        $w = $Math->sqrt($r) *
          $Math->sqrt(0.5 * (1 + $Math->sqrt(1 + $q * $q)));
      }
      else {
        $q__0 = $r / $i;
        $w = $Math->sqrt($i) *
          $Math->sqrt(0.5 * ($q__0 + $Math->sqrt(1 + $q__0 * $q__0)));
      }
      if (0 <= $x[1]) {return V(254, $w, 0.5 * $x[2] / $w);}
      $w__0 = 0 <= $x[2] ? $w : (- $w);
      return V(254, 0.5 * $i / $w, $w__0);
    };
    $exp = function($x) use ($Math) {
      $e = $Math->exp($x[1]);
      return V(254, $e * $Math->cos($x[2]), $e * $Math->sin($x[2]));
    };
    $log = function($x) use ($Math,$norm) {
      $Cn = $Math->atan2($x[2], $x[1]);
      return V(254, $Math->log($norm($x)), $Cn);
    };
    $pow = function($x, $y) use ($exp,$log,$mul) {
      return $exp($mul($y, $log($x)));
    };
    $Complex = V(
      0,
      $zero,
      $one,
      $i,
      $neg,
      $conj,
      $add,
      $sub,
      $mul,
      $inv,
      $div,
      $sqrt,
      $norm2,
      $norm,
      $arg,
      $polar,
      $exp,
      $log,
      $pow
    );
    
    $runtime->caml_register_global(19, $Complex, "Complex");

  }
}