$(function() {
  setdefault(network_class);
  main();
});
$(".test").blur(function() {
  setdefault(network_class);
  main();
});

var ip_address;
var subnet_mask;
var subnet_bits;
var mask_bits;
var max_subnets;
var host_per_subnet;
var network_class = "A";
var host_range;
var subnet_id;
var broadcast;
var first_octet_range_max;
var first_octet_range_min;
var hex_ip = [];
var hex_ip_full = "";
var str;
var wild_card_value_full;
var wild_card_value;
var sum;
var use1;
var use2;
var use3 = [];
var host;
var value;
var x = document.getElementsByClassName("subnet_mask");
var y = document.getElementsByClassName("subnet_bits");
var z = document.getElementsByClassName("mask_bits");
var a = document.getElementsByClassName("max_subnets");
var b = document.getElementsByClassName("max_hosts");


function main() {
  network_class = document.getElementById("Network Class").value;
  test(network_class, x);
  logic(network_class, 0);
  populate(network_class, ip_address, subnet_mask, subnet_bit, mask_bit, max_subnets, host_per_subnet);

}

function gyu(num) {
  value = num;
  if (value == 1) {
    ip_address = document.getElementById("Ip_Address").value;
  }
  if (value == 2) {
    subnet_mask = document.getElementById("subnet_mask").value;
  }
  if (value == 3) {
    subnet_bit = document.getElementById("subnet_bits").value;
    subnetinput(network_class,subnet_bit);
  }
  if (value == 4) {
    mask_bit = document.getElementById("mask_bits").value;
    maskbitinput(network_class, mask_bit);
  }
  if (value == 5) {
    max_subnets = document.getElementById("max_subnets").value;
     maxsubnetinput(network_class, max_subnets);
  }
  if (value == 6) {
    max_hosts = document.getElementById("max_hosts").value;
    maxhostinput(network_class, max_hosts);
  }


  logic(network_class, num);
  populate(network_class, ip_address, subnet_mask, subnet_bit, mask_bit, max_subnets, host_per_subnet);


  // else if(value=2){
  //   subnet_mask=document.getElementById("subnet_mask");
  // }
  // else if (value=3) {
  //   subnet_bit=document.getElementById("subnet_bit");
  //   for(i=0;i<y[0].length;i++){
  //     if(y[0].options[i].value==subnet_bit){
  //
  //     y[0].options[i].selected = true;
  //     }
  //   }
  // }
}

function logic(network_class) {

  deci_hex(ip_address);
  wild_card(x);
  subnet_bit_detect(network_class);
  s_input(network_class, y);
  m_input(network_class, z);
  ms_input(network_class, a);
  mh_input(network_class, b);
  getIpRangeFromAddressAndNetmask(ip_address, subnet_mask);
}

function populate(network_class, ip_address, subnet_mask, subnet_bit, mask_bit, max_subnets, host_per_subnet) {
  document.getElementById("Ip_Address").value = ip_address;
  document.getElementById("subnet_mask").value = subnet_mask;
  document.getElementById("view_first_octet").value = (first_octet_range_min + " - " + first_octet_range_max);
  document.getElementById("Hex_ip_address").value = hex_ip_full;
  document.getElementById("wild_card_value").value = wild_card_value_full;
  document.getElementById("subnet_bits").value = subnet_bit;
  document.getElementById("mask_bits").value = mask_bit;
  document.getElementById("max_subnets").value = maximum_subnet;
  document.getElementById("max_hosts").value = host_per_subnet;
  document.getElementById("host_range").value = host_range;
  document.getElementById("subnet_id").value = subnet_id;
  document.getElementById("broadcast").value = broadcast;
  //subnet_mask
  // for(var i=0;i<x[0].length;i++){
  //   console.log(x[0].options[i].value);
  //   console.log(subnet_mask);
  //   if(x[0].options[i].value == subnet_mask){
  //     x[0].options[i].selected=true;
  //   }
  // }

}

function setdefault(network_class) {
  network_class = document.getElementById("Network Class").value;
  if (network_class == "A") {
    ip_address = "10.0.0.1";
    subnet_mask = "255.0.0.0";
    first_octet_range_max = 126;
    first_octet_range_min = 1;

  }
  if (network_class == "B") {
    ip_address = "172.16.0.1";
    subnet_mask = "255.255.0.0";
    first_octet_range_max = 191;
    first_octet_range_min = 128;
  }
  if (network_class == "C") {
    ip_address = "192.168.0.1";
    subnet_mask = "255.255.255.0";
    first_octet_range_max = 223;
    first_octet_range_min = 192;
  }
}

function deci_hex(ip_address) {
  str = ip_address.split(".");
  for (var i = 0; i < 4; i++) {
    hex_ip[i] = parseInt(str[i]).toString(16).toUpperCase();
  }
  hex_ip_full = hex_ip[0] + "." + hex_ip[1] + "." + hex_ip[2] + "." + hex_ip[3];
}

function wild_card() {
  wild_card_value = subnet_mask.split('.');
  for (var i = 0; i < 4; i++) {
    wild_card_value[i] = 255 - wild_card_value[i];
  }
  wild_card_value_full = wild_card_value[0] + "." + wild_card_value[1] + "." + wild_card_value[2] + "." + wild_card_value[3];
}

function subnet_bit_detect(network_class) {
  mask = subnet_mask.split('.');
  if (network_class == "A") {
    if (mask[1] == 0) {
      subnet_bit = 0;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 128) {
      subnet_bit = 1;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 192) {
      subnet_bit = 2;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 224) {
      subnet_bit = 3;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 240) {
      subnet_bit = 4;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 248) {
      subnet_bit = 5;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 252) {
      subnet_bit = 6;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 254) {
      subnet_bit = 7;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[1] == 255) {
      if (mask[2] == 0) {
        subnet_bit = 8;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 128) {
        subnet_bit = 9;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 192) {
        subnet_bit = 10;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 224) {
        subnet_bit = 11;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 240) {
        subnet_bit = 12;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 248) {
        subnet_bit = 13;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 252) {
        subnet_bit = 14;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 254) {
        subnet_bit = 15;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[2] == 255) {
        if (mask[3] == 0) {
          subnet_bit = 16;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(mask_bit);
        } else if (mask[3] == 128) {
          subnet_bit = 17;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(mask_bit);
        } else if (mask[3] == 192) {
          subnet_bit = 18;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(mask_bit);
        } else if (mask[3] == 224) {
          subnet_bit = 19;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(subnet_bit);
        } else if (mask[3] == 240) {
          subnet_bit = 20;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(mask_bit);
        } else if (mask[3] == 248) {
          subnet_bit = 21;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(mask_bit);
        } else if (mask[3] == 252) {
          subnet_bit = 22;
          mask_bit = mask_bit_calc(subnet_bit);
          maximum_subnet = maximum_subnet_calc(subnet_bit);
          host_per_subnet = host_per_subnet_calc(mask_bit);
        }
      }

    }
  } else if (network_class == "B") {
    if (mask[2] == 0) {
      subnet_bit = 0;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 128) {
      subnet_bit = 1;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 192) {
      subnet_bit = 2;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 224) {
      subnet_bit = 3;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 240) {
      subnet_bit = 4;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 248) {
      subnet_bit = 5;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 252) {
      subnet_bit = 6;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 254) {
      subnet_bit = 7;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[2] == 255) {
      if (mask[3] == 0) {
        subnet_bit = 8;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[3] == 128) {
        subnet_bit = 9;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[3] == 192) {
        subnet_bit = 10;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[3] == 224) {
        subnet_bit = 11;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[3] == 240) {
        subnet_bit = 12;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[3] == 248) {
        subnet_bit = 13;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      } else if (mask[3] == 252) {
        subnet_bit = 14;
        mask_bit = mask_bit_calc(subnet_bit);
        maximum_subnet = maximum_subnet_calc(subnet_bit);
        host_per_subnet = host_per_subnet_calc(mask_bit);
      }


    }
  } else if (network_class == "C") {
    if (mask[3] == 0) {
      subnet_bit = 0;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[3] == 128) {
      subnet_bit = 1;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[3] == 192) {
      subnet_bit = 2;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[3] == 224) {
      subnet_bit = 3;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[3] == 240) {
      subnet_bit = 4;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[3] == 248) {
      subnet_bit = 5;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    } else if (mask[3] == 252) {
      subnet_bit = 6;
      mask_bit = mask_bit_calc(subnet_bit);
      maximum_subnet = maximum_subnet_calc(subnet_bit);
      host_per_subnet = host_per_subnet_calc(mask_bit);
    }
  }

}

function mask_bit_calc(subnet_bit) {
  if (network_class == "A") {
    return 8 + subnet_bit;
  }
  if (network_class == "B") {
    return 16 + subnet_bit;
  }
  if (network_class == "C") {
    return 24 + subnet_bit;
  }
}

function maximum_subnet_calc(subnet_bit) {
  return Math.pow(2, subnet_bit);
}

function host_per_subnet_calc(mask_bit) {
  sum = Math.pow(2, 32 - mask_bit);
  sum = sum - 2;
  return sum;
}

function getIpRangeFromAddressAndNetmask(ip_address, subnet_mask) {
  var ipaddress = ip_address.split('.');
  var netmaskblocks = subnet_mask.split('.');

  var invertedNetmaskblocks = netmaskblocks.map(function(el) {
    return el ^ 255;
  });
  var baseAddress = ipaddress.map(function(block, idx) {
    return block & netmaskblocks[idx];
  });
  var broadcastaddress = ipaddress.map(function(block, idx) {
    return block | invertedNetmaskblocks[idx];
  });
  host_range = (baseAddress[0] + "." + baseAddress[1] + "." + baseAddress[2] + "." + (baseAddress[3] + 1) + "-" + broadcastaddress[0] + "." + broadcastaddress[1] + "." + broadcastaddress[2] + "." + (broadcastaddress[3] - 1));
  subnet_id = baseAddress.join('.');
  broadcast = broadcastaddress.join('.');
}

function test(network_class, x) {

  var i = 0;
  if (network_class == "A") {
    x[0].options[8].selected = true;
    for (i; i < x[0].length; i++) {
      x[0].options[i].classList.remove('hidden');
    }
    // console.log(x[0].length);
  } else if (network_class == "B") {
    x[0].options[8].selected = true;
    for (i; i < x[0].length; i++) {
      x[0].options[i].classList.remove('hidden');
      if (i < 8) {
        x[0].options[i].classList.add('hidden');
      }

    }
  } else if (network_class == "C") {
    x[0].options[16].selected = true;
    for (i; i < x[0].length; i++) {
      x[0].options[i].classList.remove('hidden');
      if (i < 16) {
        x[0].options[i].classList.add('hidden');
      }
    }

  }
}

function s_input(network_class, y) {

  var i = 0;
  if (network_class == "A") {
    for (i; i < y[0].length; i++) {
      y[0].options[i].classList.remove('hidden');
    }
    // console.log(x[0].length);
  } else if (network_class == "B") {
    for (i; i < y[0].length; i++) {
      y[0].options[i].classList.remove('hidden');
      if (i > 14) {
        y[0].options[i].classList.add('hidden');
      }

    }
  } else if (network_class == "C") {
    for (i; i < y[0].length; i++) {
      y[0].options[i].classList.remove('hidden');
      if (i > 6) {
        y[0].options[i].classList.add('hidden');
      }
    }

  }
}

function m_input(network_class, z) {

  var i = 0;
  if (network_class == "A") {
    for (i; i < z[0].length; i++) {
      z[0].options[i].classList.remove('hidden');
    }
    // console.log(x[0].length);
  } else if (network_class == "B") {
    for (i; i < z[0].length; i++) {
      z[0].options[i].classList.remove('hidden');
      if (i < 8) {
        z[0].options[i].classList.add('hidden');
      }

    }
  } else if (network_class == "C") {
    for (i; i < z[0].length; i++) {
      z[0].options[i].classList.remove('hidden');
      if (i < 16) {
        z[0].options[i].classList.add('hidden');
      }
    }

  }
}

function ms_input(network_class, a) {

  var i = 0;
  if (network_class == "A") {
    for (i; i < a[0].length; i++) {
      a[0].options[i].classList.remove('hidden');
    }
    // console.log(x[0].length);
  } else if (network_class == "B") {
    for (i; i < a[0].length; i++) {
      a[0].options[i].classList.remove('hidden');
      if (i > 14) {
        a[0].options[i].classList.add('hidden');
      }

    }
  } else if (network_class == "C") {
    for (i; i < a[0].length; i++) {
      a[0].options[i].classList.remove('hidden');
      if (i > 6) {
        a[0].options[i].classList.add('hidden');
      }
    }

  }
}

function mh_input(network_class, b) {

  var i = 0;
  if (network_class == "A") {
    for (i; i < a[0].length; i++) {
      b[0].options[i].classList.remove('hidden');
    }
    // console.log(x[0].length);
  } else if (network_class == "B") {
    for (i; i < b[0].length; i++) {
      b[0].options[i].classList.remove('hidden');
      if (i < 8) {
        b[0].options[i].classList.add('hidden');
      }

    }
  } else if (network_class == "C") {
    for (i; i < b[0].length; i++) {
      b[0].options[i].classList.remove('hidden');
      if (i < 16) {
        b[0].options[i].classList.add('hidden');
      }
    }

  }
}

function subnetinput(network_class, subnet_bit) {
  if (network_class == "A") {
    if (subnet_bit == 0) {
      subnet_mask = "255.0.0.0";
    } else if (subnet_bit == 1) {
      subnet_mask = "255.128.0.0";
    } else if (subnet_bit == 2) {
      subnet_mask = "255.192.0.0";
    } else if (subnet_bit == 3) {
      subnet_mask = "255.224.0.0";
    } else if (subnet_bit == 4) {
      subnet_mask = "255.240.0.0";
    } else if (subnet_bit == 5) {
      subnet_mask = "255.248.0.0";
    } else if (subnet_bit == 6) {
      subnet_mask = "255.252.0.0";
    } else if (subnet_bit == 7) {
      subnet_mask = "255.254.0.0";
    } else if (subnet_bit == 8) {
      subnet_mask = "255.255.0.0";
    } else if (subnet_bit == 9) {
      subnet_mask = "255.255.128.0";
    } else if (subnet_bit == 10) {
      subnet_mask = "255.255.192.0";
    } else if (subnet_bit == 11) {
      subnet_mask = "255.255.224.0";
    } else if (subnet_bit == 12) {
      subnet_mask = "255.255.240.0";
    } else if (subnet_bit == 13) {
      subnet_mask = "255.255.248.0";
    } else if (subnet_bit == 14) {
      subnet_mask = "255.255.252.0";
    } else if (subnet_bit == 15) {
      subnet_mask = "255.255.254.0";
    } else if (subnet_bit == 16) {
      subnet_mask = "255.255.255.0";
    } else if (subnet_bit == 17) {
      subnet_mask = "255.255.255.128";
    } else if (subnet_bit == 18) {
      subnet_mask = "255.255.255.192";
    } else if (subnet_bit == 19) {
      subnet_mask = "255.255.255.224";
    } else if (subnet_bit == 20) {
      subnet_mask = "255.255.255.240";
    } else if (subnet_bit == 21) {
      subnet_mask = "255.255.255.248";
    } else if (subnet_bit == 22) {
      subnet_mask = "255.255.255.252";
    }

  } else if (network_class == "B") {

      if (subnet_bit == 0) {
      subnet_mask = "255.255.0.0";
    } else if (subnet_bit == 1) {
      subnet_mask = "255.255.128.0";
    } else if (subnet_bit == 2) {
      subnet_mask = "255.255.192.0";
    } else if (subnet_bit == 3) {
      subnet_mask = "255.255.224.0";
    } else if (subnet_bit == 4) {
      subnet_mask = "255.255.240.0";
    } else if (subnet_bit == 5) {
      subnet_mask = "255.255.248.0";
    } else if (subnet_bit == 6) {
      subnet_mask = "255.255.252.0";
    } else if (subnet_bit == 7) {
      subnet_mask = "255.255.254.0";
    } else if (subnet_bit == 8) {
      subnet_mask = "255.255.255.0";
    } else if (subnet_bit == 9) {
      subnet_mask = "255.255.255.128";
    } else if (subnet_bit == 10) {
      subnet_mask = "255.255.255.192";
    } else if (subnet_bit == 11) {
      subnet_mask = "255.255.255.224";
    } else if (subnet_bit == 12) {
      subnet_mask = "255.255.255.240";
    } else if (subnet_bit == 13) {
      subnet_mask = "255.255.255.248";
    } else if (subnet_bit == 14) {
      subnet_mask = "255.255.255.252";
    }


    }
   else if (network_class == "C") {

    if (subnet_bit == 0) {
    subnet_mask = "255.255.255.0";
  } else if (subnet_bit == 1) {
    subnet_mask = "255.255.255.128";
  } else if (subnet_bit == 2) {
    subnet_mask = "255.255.255.192";
  } else if (subnet_bit == 3) {
    subnet_mask = "255.255.255.224";
  } else if (subnet_bit == 4) {
    subnet_mask = "255.255.255.240";
  } else if (subnet_bit == 5) {
    subnet_mask = "255.255.255.248";
  } else if (subnet_bit == 6) {
    subnet_mask = "255.255.255.252";
  }
  }

}
function maskbitinput(network_class, mask_bit) {
  if (network_class == "A") {
    if (mask_bit == 8) {
      subnet_mask = "255.0.0.0";
    } else if (mask_bit == 9) {
      subnet_mask = "255.128.0.0";
    } else if (mask_bit == 10) {
      subnet_mask = "255.192.0.0";
    } else if (mask_bit == 11) {
      subnet_mask = "255.224.0.0";
    } else if (mask_bit == 12) {
      subnet_mask = "255.240.0.0";
    } else if (mask_bit == 13) {
      subnet_mask = "255.248.0.0";
    } else if (mask_bit == 14) {
      subnet_mask = "255.252.0.0";
    } else if (mask_bit == 15) {
      subnet_mask = "255.254.0.0";
    } else if (mask_bit == 16) {
      subnet_mask = "255.255.0.0";
    } else if (mask_bit == 17) {
      subnet_mask = "255.255.128.0";
    } else if (mask_bit == 18) {
      subnet_mask = "255.255.192.0";
    } else if (mask_bit == 19) {
      subnet_mask = "255.255.224.0";
    } else if (mask_bit == 20) {
      subnet_mask = "255.255.240.0";
    } else if (mask_bit == 21) {
      subnet_mask = "255.255.248.0";
    } else if (mask_bit == 22) {
      subnet_mask = "255.255.252.0";
    } else if (mask_bit == 23) {
      subnet_mask = "255.255.254.0";
    } else if (mask_bit == 24) {
      subnet_mask = "255.255.255.0";
    } else if (mask_bit == 25) {
      subnet_mask = "255.255.255.128";
    } else if (mask_bit == 26) {
      subnet_mask = "255.255.255.192";
    } else if (mask_bit == 27) {
      subnet_mask = "255.255.255.224";
    } else if (mask_bit == 28) {
      subnet_mask = "255.255.255.240";
    } else if (mask_bit == 29) {
      subnet_mask = "255.255.255.248";
    } else if (mask_bit == 30) {
      subnet_mask = "255.255.255.252";
    }

  } else if (network_class == "B") {

      if (mask_bit == 16) {
      subnet_mask = "255.255.0.0";
    } else if (mask_bit == 17) {
      subnet_mask = "255.255.128.0";
    } else if (mask_bit == 18) {
      subnet_mask = "255.255.192.0";
    } else if (mask_bit == 19) {
      subnet_mask = "255.255.224.0";
    } else if (mask_bit == 20) {
      subnet_mask = "255.255.240.0";
    } else if (mask_bit == 21) {
      subnet_mask = "255.255.248.0";
    } else if (mask_bit == 22) {
      subnet_mask = "255.255.252.0";
    } else if (mask_bit == 23) {
      subnet_mask = "255.255.254.0";
    } else if (mask_bit == 24) {
      subnet_mask = "255.255.255.0";
    } else if (mask_bit == 25) {
      subnet_mask = "255.255.255.128";
    } else if (mask_bit == 26) {
      subnet_mask = "255.255.255.192";
    } else if (mask_bit == 27) {
      subnet_mask = "255.255.255.224";
    } else if (mask_bit == 28) {
      subnet_mask = "255.255.255.240";
    } else if (mask_bit == 29) {
      subnet_mask = "255.255.255.248";
    } else if (mask_bit == 30) {
      subnet_mask = "255.255.255.252";
    }


    }
   else if (network_class == "C") {

    if (mask_bit == 24) {
    subnet_mask = "255.255.255.0";
  } else if (mask_bit == 25) {
    subnet_mask = "255.255.255.128";
  } else if (mask_bit == 26) {
    subnet_mask = "255.255.255.192";
  } else if (mask_bit == 27) {
    subnet_mask = "255.255.255.224";
  } else if (mask_bit == 28) {
    subnet_mask = "255.255.255.240";
  } else if (mask_bit == 29) {
    subnet_mask = "255.255.255.248";
  } else if (mask_bit == 30) {
    subnet_mask = "255.255.255.252";
  }
  }

}
function maxsubnetinput(network_class, max_subnets) {
  if (network_class == "A") {
    if (max_subnets == 1) {
      subnet_mask = "255.0.0.0";
    } else if (max_subnets == 2) {
      subnet_mask = "255.128.0.0";
    } else if (max_subnets == 4) {
      subnet_mask = "255.192.0.0";
    } else if (max_subnets == 8) {
      subnet_mask = "255.224.0.0";
    } else if (max_subnets == 16) {
      subnet_mask = "255.240.0.0";
    } else if (max_subnets == 32) {
      subnet_mask = "255.248.0.0";
    } else if (max_subnets == 64) {
      subnet_mask = "255.252.0.0";
    } else if (max_subnets == 128) {
      subnet_mask = "255.254.0.0";
    } else if (max_subnets == 256) {
      subnet_mask = "255.255.0.0";
    } else if (max_subnets == 512) {
      subnet_mask = "255.255.128.0";
    } else if (max_subnets == 1024) {
      subnet_mask = "255.255.192.0";
    } else if (max_subnets == 2048) {
      subnet_mask = "255.255.224.0";
    } else if (max_subnets == 4096) {
      subnet_mask = "255.255.240.0";
    } else if (max_subnets == 8192) {
      subnet_mask = "255.255.248.0";
    } else if (max_subnets == 16384) {
      subnet_mask = "255.255.252.0";
    } else if (max_subnets == 32768) {
      subnet_mask = "255.255.254.0";
    } else if (max_subnets == 65536) {
      subnet_mask = "255.255.255.0";
    } else if (max_subnets == 131072) {
      subnet_mask = "255.255.255.128";
    } else if (max_subnets == 262144) {
      subnet_mask = "255.255.255.192";
    } else if (max_subnets == 524288) {
      subnet_mask = "255.255.255.224";
    } else if (max_subnets == 1048576) {
      subnet_mask = "255.255.255.240";
    } else if (max_subnets == 2097152) {
      subnet_mask = "255.255.255.248";
    } else if (max_subnets == 4194304) {
      subnet_mask = "255.255.255.252";
    }

  } else if (network_class == "B") {

      if (max_subnets == 1) {
      subnet_mask = "255.255.0.0";
    } else if (max_subnets == 2) {
      subnet_mask = "255.255.128.0";
    } else if (max_subnets == 4) {
      subnet_mask = "255.255.192.0";
    } else if (max_subnets == 8) {
      subnet_mask = "255.255.224.0";
    } else if (max_subnets == 16) {
      subnet_mask = "255.255.240.0";
    } else if (max_subnets == 32) {
      subnet_mask = "255.255.248.0";
    } else if (max_subnets == 64) {
      subnet_mask = "255.255.252.0";
    } else if (max_subnets == 128) {
      subnet_mask = "255.255.254.0";
    } else if (max_subnets == 256) {
      subnet_mask = "255.255.255.0";
    } else if (max_subnets == 512) {
      subnet_mask = "255.255.255.128";
    } else if (max_subnets == 1024) {
      subnet_mask = "255.255.255.192";
    } else if (max_subnets == 2048) {
      subnet_mask = "255.255.255.224";
    } else if (max_subnets == 4096) {
      subnet_mask = "255.255.255.240";
    } else if (max_subnets == 8192) {
      subnet_mask = "255.255.255.248";
    } else if (max_subnets == 16384) {
      subnet_mask = "255.255.255.252";
    }


    }
   else if (network_class == "C") {

    if (max_subnets == 1) {
    subnet_mask = "255.255.255.0";
  } else if (max_subnets == 2) {
    subnet_mask = "255.255.255.128";
  } else if (max_subnets == 4) {
    subnet_mask = "255.255.255.192";
  } else if (max_subnets == 8) {
    subnet_mask = "255.255.255.224";
  } else if (max_subnets == 16) {
    subnet_mask = "255.255.255.240";
  } else if (max_subnets == 32) {
    subnet_mask = "255.255.255.248";
  } else if (max_subnets == 64) {
    subnet_mask = "255.255.255.252";
  }
  }

}
function maxhostinput(network_class, max_hosts){
  if (network_class == "A") {
    if (max_hosts == 16777214) {
      subnet_mask = "255.0.0.0";
    } else if (max_hosts == 8388606) {
      subnet_mask = "255.128.0.0";
    } else if (max_hosts == 4194302) {
      subnet_mask = "255.192.0.0";
    } else if (max_hosts == 2097150) {
      subnet_mask = "255.224.0.0";
    } else if (max_hosts == 1048574) {
      subnet_mask = "255.240.0.0";
    } else if (max_hosts == 524286) {
      subnet_mask = "255.248.0.0";
    } else if (max_hosts == 262142) {
      subnet_mask = "255.252.0.0";
    } else if (max_hosts == 131070) {
      subnet_mask = "255.254.0.0";
    } else if (max_hosts == 65534) {
      subnet_mask = "255.255.0.0";
    } else if (max_hosts == 32766) {
      subnet_mask = "255.255.128.0";
    } else if (max_hosts == 16382) {
      subnet_mask = "255.255.192.0";
    } else if (max_hosts == 8190) {
      subnet_mask = "255.255.224.0";
    } else if (max_hosts == 4094) {
      subnet_mask = "255.255.240.0";
    } else if (max_hosts == 2046) {
      subnet_mask = "255.255.248.0";
    } else if (max_hosts == 1022) {
      subnet_mask = "255.255.252.0";
    } else if (max_hosts == 510) {
      subnet_mask = "255.255.254.0";
    } else if (max_hosts == 254) {
      subnet_mask = "255.255.255.0";
    } else if (max_hosts == 126) {
      subnet_mask = "255.255.255.128";
    } else if (max_hosts == 62) {
      subnet_mask = "255.255.255.192";
    } else if (max_hosts == 30) {
      subnet_mask = "255.255.255.224";
    } else if (max_hosts == 14) {
      subnet_mask = "255.255.255.240";
    } else if (max_hosts == 6) {
      subnet_mask = "255.255.255.248";
    } else if (max_hosts == 2) {
      subnet_mask = "255.255.255.252";
    }

  } else if (network_class == "B") {

      if (max_hosts == 65534) {
      subnet_mask = "255.255.0.0";
    } else if (max_hosts == 32766) {
      subnet_mask = "255.255.128.0";
    } else if (max_hosts == 16382) {
      subnet_mask = "255.255.192.0";
    } else if (max_hosts == 8190) {
      subnet_mask = "255.255.224.0";
    } else if (max_hosts == 4094) {
      subnet_mask = "255.255.240.0";
    } else if (max_hosts == 2046) {
      subnet_mask = "255.255.248.0";
    } else if (max_hosts == 1022) {
      subnet_mask = "255.255.252.0";
    } else if (max_hosts == 510) {
      subnet_mask = "255.255.254.0";
    } else if (max_hosts == 254) {
      subnet_mask = "255.255.255.0";
    } else if (max_hosts == 126) {
      subnet_mask = "255.255.255.128";
    } else if (max_hosts == 62) {
      subnet_mask = "255.255.255.192";
    } else if (max_hosts == 30) {
      subnet_mask = "255.255.255.224";
    } else if (max_hosts == 14) {
      subnet_mask = "255.255.255.240";
    } else if (max_hosts == 6) {
      subnet_mask = "255.255.255.248";
    } else if (max_hosts == 2) {
      subnet_mask = "255.255.255.252";
    }


    }
   else if (network_class == "C") {

    if (max_hosts == 254) {
    subnet_mask = "255.255.255.0";
  } else if (max_hosts == 126) {
    subnet_mask = "255.255.255.128";
  } else if (max_hosts == 62) {
    subnet_mask = "255.255.255.192";
  } else if (max_hosts == 30) {
    subnet_mask = "255.255.255.224";
  } else if (max_hosts == 14) {
    subnet_mask = "255.255.255.240";
  } else if (max_hosts == 6) {
    subnet_mask = "255.255.255.248";
  } else if (max_hosts == 2) {
    subnet_mask = "255.255.255.252";
  }
  }
}
