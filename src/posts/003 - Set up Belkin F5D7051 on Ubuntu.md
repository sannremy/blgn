<!--
  tags: Ubuntu
  category: Ubuntu
  title: Set up Belkin F5D7051 on Ubuntu
  date: 2012-04-15
-->

This is an unusual post but it might help few people who are trying to set up Wi-Fi connection with a Belkin F5D7051. This was tested on Ubuntu 11.10 32-bit.

![Belkin F5D7051](images/posts/set-up-belkin-f5d7051-on-ubuntu/Belkin_F5D7051.jpg "Belkin F5D7051")

Cause
-----

During the installation of Ubuntu, the Wi-Fi has been successfully connected but after rebooting: no network interface (`wlan0`). This is due to a conflict between 2 modules: `rt2500usb` and `rndis_wlan`. In fact, there are 2 types of F5D7051 based on the Broadcom BCM4320 and Ralink RT2500USB chipsets. The problem is that both have the same ID `vendor:product` that is to say `050d:7051`, so the kernel could load the wrong one. Here are the steps to fix the issue.

Troubleshoot
------------

The following solution is to blacklist the wrong module.

First of all, ensure that you have the right component by typing in the terminal:
<pre><code class="language-bash">lsusb</code></pre>

It should display something like:
<pre><code class="language-markup">Bus 001 Device 003: ID 050d:7051 Belkin Components F5D7051
802.11g Adapter v1000 [Broadcom 4320 USB]</code></pre>

Note that `050d:7051` is the unique identifier of the component and `[Broadcom 4320 USB]` is the based chipset.
Then, check loaded modules with this command:
<pre><code class="language-bash">lsmod</code></pre>

If you see both modules: `rt2500usb` and `rndis_wlan`, edit the `/etc/modprobe.d/blacklist.conf` and add the following line at the end of the file (to edit you need to be root; if you have a Ralink chipset, replace `rt2500usb` by `rndis_wlan`):
<pre><code class="language-bash">blacklist rt2500usb</code></pre>

Then, unload the module by typing in the terminal:
<pre><code class="language-bash">sudo modprobe -r rt2500usb</code></pre>

Finally, save the file and reboot the computer.
Hope it helps. :-)