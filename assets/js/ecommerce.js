var checkboxFilter = {
    $filters: null,
    $reset: null,
    groups: [],
    outputArray: [],
    outputString: "",
    init: function() {
        var t = this;
        t.$filters = $("#Filters"),
        t.$reset = $("#Reset"),
        t.$container = $("#Container"),
        t.$filters.find("fieldset").each(function() {
            t.groups.push({
                $inputs: $(this).find("input"),
                active: [],
                tracker: !1
            })
        }),
        t.bindHandlers()
    },
    bindHandlers: function() {
        var t = this;
        t.$filters.on("change", function() {
            t.parseFilters()
        }),
        t.$reset.on("click", function(r) {
            r.preventDefault(),
            t.$filters[0].reset(),
            t.parseFilters()
        })
    },
    parseFilters: function() {
        for (var t, r = this, e = 0; r.groups[e]; e++)
            t = r.groups[e],
            t.active = [],
            t.$inputs.each(function() {
                $(this).is(":checked") && t.active.push(this.value)
            }),
            t.active.length && (t.tracker = 0);
        r.concatenate()
    },
    concatenate: function() {
        var t = this
          , r = ""
          , e = !1
          , i = function() {
            for (var r = t.groups.length - 1; r > -1; r--) {
                var i = t.groups[r];
                if (i.active[i.tracker + 1]) {
                    i.tracker++;
                    break
                }
                r > 0 ? i.tracker && (i.tracker = 0) : e = !0
            }
        };
        t.outputArray = [];
        do {
            !function() {
                for (var e, n = 0; t.groups[n]; n++)
                    e = t.groups[n],
                    e.active[e.tracker] && (r += e.active[e.tracker]),
                    n === t.groups.length - 1 && (t.outputArray.push(r),
                    r = "",
                    i())
            }()
        } while (!e && function() {
            for (var r, e = 0, i = 0; t.groups[i]; i++)
                r = t.groups[i],
                !1 === r.tracker && e++;
            return e < t.groups.length
        }());
        t.outputString = t.outputArray.join(),
        !t.outputString.length && (t.outputString = "all"),
        t.$container.mixItUp("isLoaded") && t.$container.mixItUp("filter", t.outputString)
    }
};
$(function() {
    var t = $("#SortSelect")
      , r = $("#Container");
    checkboxFilter.init(),
    r.mixItUp({
        controls: {
            enable: !1
        },
        animation: {
            easing: "cubic-bezier(0.86, 0, 0.07, 1)",
            duration: 600
        }
    }),
    t.on("change", function() {
        r.mixItUp("sort", this.value)
    })
});


